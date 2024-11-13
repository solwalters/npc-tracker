import { Request, Response } from "express";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const getFirstName = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_first_names;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getLastName = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_last_names;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getAlias = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_aliases;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getOrigin = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_origins;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getIdentifyingFeature = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_identifying_features;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getJob = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_jobs;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getPersonalityQuirk = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_personality_quirks;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getRace = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_races;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getAdjective = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_adjectives;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const getOrganization = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const query = 'select id, value from default_organizations;';
    const { rows } = await pool.query(query, []);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

// this one is a little more complicated
export const getMetatype = async (req: Request, res: Response):Promise<any>=> {
  try {
    const defaultReturnObject = [];
    const randomMetatypeId = await weightedMetatypes(req, res);
    const query = 'select id, value from default_metatypes where id=$1;';
    const { rows } = await pool.query(query, [randomMetatypeId]);

    if (rows.length === 0) {
      return res.status(200).json(defaultReturnObject);
    }

    const selectedValue = rows[Math.floor(Math.random() * rows.length)];

    res.status(200).json(selectedValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
};

export const weightedMetatypes = async (req: Request, res: Response):Promise<any>=> {
  try {
    const query = 'select id, value, default_population from default_metatypes;';
    const { rows } = await pool.query(query, []);

    let weightedList : string[] = []
    for (var i = 0; i < rows.length; i++){
      for (var j = 0; j < rows[i].default_population * 10; j++){
        weightedList.push(rows[i].id);
      }
    }
    // this is where we would decide if we are using a variant
    // not sure how to store that on the front end so for now, leaving it out
    // const useVariant = Math.floor(Math.random() * 100)
    const randomMetatypeId = weightedList[Math.floor(Math.random() * weightedList.length)];
    return randomMetatypeId;
  } catch (err) {
    console.error(err);
    res.status(500).json({'error': err});
  }
}
