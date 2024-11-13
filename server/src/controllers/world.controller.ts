import { Request, Response } from "express";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const getUserWorlds = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const { userId } = req.params;
    const query = 'select id, world_name as "worldName" from worlds where world_owner = $1;';
    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const createWorld = async (req: Request, res: Response):Promise<any>=> {
  try {
    // this is where the logic for the number of worlds should go
    // we should also enforce uniqueness per owner/world here
    // todo: figure out how to pass backend errors back into formik/yum
    const { worldName, worldOwner } = req.body;
    const query = 'insert into worlds (world_name, world_owner) values ($1, $2);';
    const { rows } = await pool.query(query, [worldName, worldOwner]);

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const deleteWorld = async (req: Request, res: Response):Promise<any>=> {
  try {
    const { worldId } = req.params;
    const { deletingUser } = req.body;
    console.log("worldId: ", worldId);
    console.log("deletingUser: ", deletingUser);
    const query = 'delete from worlds where id = $1 and world_owner = $2';
    const { rows } = await pool.query(query, [worldId, deletingUser]);

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};