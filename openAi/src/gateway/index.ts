import { OpenAI } from 'openai'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.SECRET_OPEN_AI_KEY
})

export default async function handler(req: Request, res: Response) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    })
    console.log(completion);
    res.status(200).json({ result: completion })
  } catch (error) {
    console.error(error)
    res.send('Erro')
  }  
}