// model Cars
import { Request, Response } from 'express';
import { prisma } from "../prisma.js";


export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cars.findMany({
      select: {
        model: true,
        year: true,
        price: true,
        brand: { 
          select: { 
            name: true, 
            logoUrl: true,
          }
        }
      },
    orderBy: {
      price: 'asc'
    }
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch cars'});
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value'});
  }
  try {
    const data = await prisma.cars.findUnique({
      where: {id}
    });

    return res.status(200).json(data);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch cars'});
    
  }
};

export const createRecord = async (req: Request, res: Response) => {
  
  const {category, brandId, model, year, price, fueltype} = req.body;
  if
    (!category || !brandId || !model || !year || !price || !fueltype){
    return res.status(400).json({ error: 'Alle felte skal udfyldes'});
  }
  try {
    const data = await prisma.cars.create({
      data: {
        category,
        brandId: Number(brandId),
        model,
        year: Number(year),
        price,
        fueltype
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
  const {category, brandId, model, year, price, fueltype } = req.body
  if(!id) {
    return res.status(400).json({error:'Id skal have en gyldig værdi'})
  }
   if  
    (!category || !brandId || !model || !year || !price || !fueltype) { 
      return res.status(400).json({error:'Alle felter skal udfyldes'})
    }
    try {
      const data = await prisma.cars.update({
        where: {id},
        data: {
          category,
          brandId,
          model,
          year: Number(year),
          price,
          fueltype,
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
    await prisma.cars.delete({
      where: { id },
    });
    res.status(200).json({ message: `Bil nr. ${id} er slettet`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette bilen'});
  }
  
}