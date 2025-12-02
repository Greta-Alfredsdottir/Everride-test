import { prisma } from "../prisma.js"

// model Brand

export const getRecords = async (req, res) => {
  try {
    const data = await prisma.brand.select()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send(`DB Fejl: Kan ikke finde brand`)
  }
}