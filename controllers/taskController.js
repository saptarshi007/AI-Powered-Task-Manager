const Task = require('../models/taskModel');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

exports.createTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        // Use AI to suggest priority
        const aiResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Suggest a priority (Low, Medium, High) for a task with the following details:\nTitle: ${title}\nDescription: ${description}\nDeadline: ${deadline}`,
            max_tokens: 10
        });

        const priority = aiResponse.data.choices[0].text.trim();

        const task = await Task.create({ title, description, deadline, priority });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};