
// Fil: ./src/controllers/userController.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import bcrypt from 'bcrypt';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if(!id) {
    return res.status(400).json({ error: 'Id is missing'})
  }
  try {
    const data = await prisma.user.findUnique({
      where: {id},

    })
  }
  catch( error){
    console.error(error)
  }
}

export const createRecord = async (req: Request, res: Response) => {
  const {firstname, lastname, email, password, role, isActive} = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields'})
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: role,
        isActive: Boolean(isActive),
      }
    })
  }
   catch( error){
    console.error(error)
  }
}
export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);



  if(!id) {
    return res.status(400).json({ error: 'Id is missing'})
  };

  const {firstname, lastname, email, password, role, isActive} = req.body;

  if(!firstname || !lastname || !email || !password){
    return res.status(400).json({ error: 'All data is required'})
  }
  try {
    const data = await prisma.user.update({
      where: {id},
      data: {
        firstname,
        lastname,
        email,
        password,
        role: role,
        isActive: Boolean(isActive),
      }

    })
  } catch( error){
    console.error(error)
  }
}

