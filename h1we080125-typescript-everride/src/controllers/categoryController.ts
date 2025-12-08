// model categorys
import { Request, Response } from 'express';
import { prisma } from "../prisma.js";


export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch categorys'});
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value'});
  }
  try {
    const data = await prisma.category.findUnique({
      where: {id}
    });

    return res.status(200).json(data);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch category'});
    
  }
};

export const createRecord = async (req: Request, res: Response) => {
  
  const {name, logoUrl} = req.body;
  if
    (!name || !logoUrl){
    return res.status(400).json({ error: 'Alle felte skal udfyldes'});
  }
  try {
    const data = await prisma.category.create({
      data: {
        name,
      }
    })
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Noget gik galt i serveren'})
    
  }
  
}

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const {name, logoUrl } = req.body
  if(!id) {
    return res.status(400).json({error:'Id skal have en gyldig værdi'})
  }
   if  
    (!name || !logoUrl) { 
      return res.status(400).json({error:'Alle felter skal udfyldes'})
    }
    try {
      const data = await prisma.category.update({
        where: {id},
        data: {
          name,

        }
      })
      return res.status(201).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Noget gik galt i serveren'})
      
    }
}

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  console.log(id);
  try {
    await prisma.category.delete({
      where: { id },
    });
    res.status(200).json({ message: `category nr. ${id} er slettet`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette categoryet'});
  }
  
}