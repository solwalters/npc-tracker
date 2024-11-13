import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { apiRequest, getUserId } from '../../lib/common';
import { NavLink } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createWorld } from "../../service/index.service";
import { useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import Link from '@mui/material/Link';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';

const userId = getUserId();
const pages = {
  create: "create",
  select: "select",
  loading: "loading"
}

const WorldSelect = () => {
  const [worlds, setWorlds] = React.useState<World[]>([]);
  const [activePage, setActivePage] = React.useState(pages.loading);
  const [existingWorlds, setExistingWorlds] = React.useState(false);

  React.useEffect(() => {
    apiRequest('world/getWorldsForUser/' + userId)
      .then((data: Array<World>) => {
        setWorlds(data)
        if (data.length > 0){
          setActivePage(pages.select)
          setExistingWorlds(true)
        } else {
          setActivePage(pages.create)
          setExistingWorlds(false)
        }
      })
  }, []);

  return (
    <div>
      {activePage === pages.loading ?
        <Loading /> :
        activePage === pages.select ?
        <SelectWorld
          worlds={worlds}
          existingWorlds={existingWorlds}
          stateChanger={setActivePage}
          setWorlds={setWorlds}
        /> :
        <CreateWorld
          worlds={worlds}
          existingWorlds={existingWorlds}
          stateChanger={setActivePage}
          setWorlds={setWorlds}
        />
      }
    </div>
  );
};

interface World {
  id: number,
  worldName: string
}

interface WorldFormValues {
  worldName: string;
  worldOwner: number;
}

interface SelectWorldType{
  existingWorlds: boolean,
  stateChanger: Function,
  worlds: Array<World>,
  setWorlds: Function
};

const Loading = () => {
  return (
    <p>Loading...</p>
  );
};

const CreateWorld = ({existingWorlds, stateChanger, worlds}: SelectWorldType) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    worldName: Yup.string().required("World Name is required"),
  });

  const handleSubmit = async (
    values: WorldFormValues,
    { setSubmitting }: FormikHelpers<WorldFormValues>
  ) => {
    // Handle form submission
    const submit = await createWorld(values);
    setSubmitting(false);
    navigate(0);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create a World</h1>
        {existingWorlds && <p> <Link
        component="button"
        variant="body2"
        onClick={() => {
          stateChanger(pages.select)
        }}
      >
        <ArrowBackIosNewIcon /> Pick a World Instead
      </Link></p>}
      </div>
      <Formik
        initialValues={{ worldName: "", worldOwner: userId }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }: FormikProps<WorldFormValues>) => (
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="worldName">
              <Form.Label>World Name</Form.Label>
              <Field type="worldName" name="worldName" as={Form.Control} />
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-full">
              Create World
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const SelectWorld = ({existingWorlds, stateChanger, worlds, setWorlds}: SelectWorldType) => {
  return (
    <>
      <p><Link
        component="button"
        variant="body2"
        onClick={() => {
          stateChanger(pages.create)
        }}
      >
        <AddCircleIcon /> Add A World
      </Link></p>
      <List>
        {
          worlds.map(world => (
            <>
              <ListItem key={world.id}>
                <ListItemButton>
                  <NavLink to={'/worlds/'+world.id}>
                    <ListItemText primary={world.worldName} />
                  </NavLink>
                </ListItemButton>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    const index = worlds.findIndex(item => item.id === world.id);
                    setWorlds(worlds.splice(index, 1));
                    apiRequest('world/delete/' + world.id, "POST", {'deletingUser': userId})
                  }}>
                  <DeleteIcon />
                </Link>
              </ListItem>
            </>
            ))
        }
      </List>
    </>
  );
}

export default WorldSelect;