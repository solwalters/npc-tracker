# Welcome to NPC Tracker #

This project is meant for me to learn how to use Node.js on the backend, and React on the frontend to create a tool to both generate and store NPCs for a Shadowrun inspired world.

See the tool on https://npc-tracker-five.vercel.app/

## Deployment: ##
Deployment is managed by vercel for now, just to get something free and available. Manual updates to the database are still required until I figure out automatic db updates.

For local db dump, run the following:
`.\pg_dump -U postgres -d npc-tracker -f D:\dev\npc-tracker\dump.sql -C --inserts`

## Dev Roadmap: ##
- ~~get repo onto github,~~ get code reviews done
- figure out some sort of cache (redis?) for local storage to reduce db chatter on random attribute generation
- change auth from cookie based to state based
- CRUD factions to world
- CRUD locations to world
- populate data for better randomness
- allow people to submit suggestions for data
  - form > db > admin page?
- automated deployments
- ~~deploy/hosting for free/cheap~~
- Update World Name (on world screen)
- full form randomizer w/ clickable rerolls & empty forms to add previously created NPCs (does/can this link into suggestions for data?)
- Set up hooks for account type (free/paid) - dummy for now
- World Creation Limit = 2 for free account FE & BE limitations


## Known Bugs: ##
- deleting the bottom/second world in the world select removes the wrong world from the list (refresh fixes)
- on mobile, when personality quirk is long, the text goes off the screen - probably can fix by adding overflow: scroll on the root div
- on mobile, navbar buttons and first name last name are colliding



## todo: ##
investigate different tools:
- Formik
- Yup
- axios

- use typescript in Yup Schema
- split out WorldSelect & summary components
- look into using yup instead of regex on the parseTemplate function
- how to share types across FE/BE
- move the app out of the header tags
- investigate the Routes - should it be a navigate instead of undefined?
- change navbar.js to NavBar.tsx as it returns a component
- on navbar, can consolodate check to a single instance and render all 3 buttons at once
- in summary, RollAllValues should not be R but r because it is not a component, it is a local function
- in summary, ReplaceTag (same issue) should also use arrow functions
- look into a toolkit like lodash for the gender array
- in summary, extract components into their own files
- update tsconfig.json to add server path to the 'include' section



## local server troubleshooting: ##
if you run into issues (closing the terminal without stopping the server) run this:

```
netstat -ano |findstr :3000
netstat -ano |findstr :3001
```

then this

`taskkill /PID {PID from previous commands} /F`