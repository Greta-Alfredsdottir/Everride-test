import { prisma } from "../prisma.js"

// model Category

export const getRecords = async (req, res) => {
  try {
    const data = await prisma.category.select()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send(`DB Fejl: Kunne ikke hente category`)
  }
}