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


## todo: ##
investigate different tools:
- Formik
- Yup
- axios

- ant.design for UI or MUI (material Ui)


## local server troubleshooting: ##
if you run into issues (closing the terminal without stopping the server) run this:

```
netstat -ano |findstr :3000
netstat -ano |findstr :3001
```

then this

`taskkill /PID {PID from previous commands} /F`