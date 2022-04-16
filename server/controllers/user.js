import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exisitingUser = await User.findOne({ email });

        if (!exisitingUser) return res.status(404).json({ message: "User doesn't exist." })

        const isPasswordCorrect = await bcrypt.compare(password, exisitingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid password supplied' })

        const token = jwt.sign({ email: exisitingUser.email, id: exisitingUser._id }, process.env.SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: exisitingUser, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}


export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) return res.status(400).json({ message: "User already exists" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" })

        const hashedPassword = await bcrypt.hash(password, 12); // 12 defines the salt (level of difficulty to hash password)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "1h" });

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};