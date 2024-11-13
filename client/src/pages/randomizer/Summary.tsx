import React from "react";
import RandomizedValue from '../../components/RandomizedValue'

import CasinoIcon from '@mui/icons-material/Casino';
import { apiRequest } from '../../lib/common';

const Summary = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [alias, setAlias] = React.useState('');
  const [adjective, setAdjective] = React.useState('');
  const [metatype, setMetatype] = React.useState('');
  const [race, setRace] = React.useState('');
  const [origin, setOrigin] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [identifyingFeatures, setIdentifyingFeatures] = React.useState<string[]>([]);
  const [jobs, setJobs] = React.useState<string[]>([]);
  const [personalityQuirks, setPersonalityQuirks] = React.useState<string[]>([]);

  React.useEffect(() => {
    RollAllValues()
  }, []);

  async function ParseTemplate(input: string, gender: string) {
    /*
    allows for the following tags:
    [pronoun-he] - returns he or she depending on the gender value
    [pronoun-his] - returns his or her depending on the gender value
    [metatype] - returns a random metatype
    [gender-plural] - returns "men" or "women" randomly
    [organization] - returns a random organization
    */
    const result = [];
    const regex = /\[([^\]]+)\]/g; // Matches text inside square brackets
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
      // Add text before the brackets to the result array
      if (match.index > lastIndex) {
        result.push(input.slice(lastIndex, match.index));
      }

      // replace the tag with something else
      const placeholder = match[1];
      const value = await ReplaceTag(placeholder, gender)
      result.push(value);
      lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last match
    if (lastIndex < input.length) {
      result.push(input.slice(lastIndex));
    }

    return result.join(""); // Combine into a final string
  }

  async function ReplaceTag(placeholder: string, currentGender: string){
    let replacement = '';
    switch (placeholder) {
      case "metatype":
        const metatypeRoll = await apiRequest('randomizer/metatype');
        replacement = metatypeRoll.value;
        break;
      case "organization":
        const orgRoll = await apiRequest('randomizer/organization');
        replacement = orgRoll.value;
        break;
      case "gender-plural":
        const genders = ['men', 'women']
        replacement = genders[Math.floor(Math.random() * genders.length)];
        break;
      case "pronoun-he":
        replacement = currentGender === 'He' ? 'he' : 'she';
        break;
      case "pronoun-his":
        replacement = currentGender === 'He' ? 'his' : 'her';
        break;
      default:
        console.error('Tag ' + placeholder + ' not yet supported.')
    }
    return replacement;
  }

  function RandomGender() {
    const genders = ['He', 'He', 'He', 'He', 'She', 'She', 'She', 'She']
    return genders[Math.floor(Math.random() * genders.length)];
  }

  async function RandomIdentifyingFeatures() {
    const RNG = Math.floor((Math.random() * 3) + 1);
    const idfArray = []
    for (let i = 0; i < RNG; i++) {
      const feature = await apiRequest('randomizer/identifyingFeature');
      const parsedFeature = await ParseTemplate(feature.value, gender)
      idfArray.push(parsedFeature);
    }
    setIdentifyingFeatures(idfArray);
  }

  async function RerollOneIdentifyingFeature(index: number) {
    const newIdentifyingFeature = await apiRequest('randomizer/identifyingFeature');
    const parsedNewFeature = await ParseTemplate(newIdentifyingFeature.value, gender)
    // Create a new array with the updated value
    const updatedIdentifyingFeatures = [...identifyingFeatures];
    updatedIdentifyingFeatures[index] = parsedNewFeature;
    setIdentifyingFeatures(updatedIdentifyingFeatures);
  }

  async function RandomJobs() {
    const RNG = Math.floor((Math.random() * 2) + 1);
    const jobArray = []
    for (let i = 0; i < RNG; i++) {
      const job = await apiRequest('randomizer/job');
      jobArray.push(job.value);
    }
    setJobs(jobArray);
  }

  async function RerollOneJob(index: number) {
    const newJob = await apiRequest('randomizer/job');
    // Create a new array with the updated value
    const updatedJobs = [...jobs];
    updatedJobs[index] = newJob.value;
    setJobs(updatedJobs);
  }

  async function RandomPersonalityQuirks() {
    const RNG = Math.floor((Math.random() * 2) + 1);
    const pqArray = []
    for (let i = 0; i < RNG; i++) {
      const pq = await apiRequest('randomizer/personalityQuirk');
      const parsedPQ = await ParseTemplate(pq.value, gender)
      pqArray.push(parsedPQ);
    }
    setPersonalityQuirks(pqArray);
  }

  async function RerollOnePersonalityQuirk(index: number) {
    const newPQ = await apiRequest('randomizer/personalityQuirk');
    const parsedNewPQ = await ParseTemplate(newPQ.value, gender)
    // Create a new array with the updated value
    const updatedPQ = [...personalityQuirks];
    updatedPQ[index] = parsedNewPQ;
    setPersonalityQuirks(updatedPQ);
  }

  async function RollValue(path: string, fn: (value: string) => void) {
    const newValue = await apiRequest(path);
    fn(newValue.value);
  }

  function RollAllValues() {
    RollValue('randomizer/firstName', setFirstName);
    RollValue('randomizer/lastName', setLastName);
    RollValue('randomizer/race', setRace);
    RollValue('randomizer/alias', setAlias);
    RollValue('randomizer/adjective', setAdjective);
    RollValue('randomizer/metatype', setMetatype);
    RollValue('randomizer/origin', setOrigin);
    setGender(RandomGender());
    RandomIdentifyingFeatures();
    RandomJobs();
    RandomPersonalityQuirks();
  }

  function AorAn(followingWord: string) {
    const firstLetter = followingWord.charAt(0).toLowerCase();
    if (['a', 'e', 'i', 'o', 'u'].includes(firstLetter)) {
      return 'an';
    } else {
      return 'a';
    }
  }

  const IdentifyingFeatures = () => {
    return (
      <>
        <CasinoIcon color="success" onClick={() => RandomIdentifyingFeatures()}/> [
        {
          identifyingFeatures.map(
            (idFeat, index) => {
              if (index === identifyingFeatures.length - 1 && identifyingFeatures.length > 1) {
                return (
                  <> and <RandomizedValue key={index} name='Identifying Feature' value={idFeat} rerollFunction={() => RerollOneIdentifyingFeature(index)} /></>
                )
              } else if ( identifyingFeatures.length > 1) {
                return (
                  <><RandomizedValue key={index} name='Identifying Feature' value={idFeat} rerollFunction={() => RerollOneIdentifyingFeature(index)} />,</>
                )
              } else {
                return (
                  <><RandomizedValue key={index} name='Identifying Feature' value={idFeat} rerollFunction={() => RerollOneIdentifyingFeature(index)} /></>
                )
              }
            }
          )
        }
        ]
      </>
    );
  }

  const Jobs = () => {
    return (
      <>
      <CasinoIcon color="success" onClick={() => RandomJobs()}/> [
      {
        jobs.map(
          (job, index) => {
            if (index ===0 && jobs.length > 1) {
              return (
                <>used to be a <RandomizedValue key={index} name='Job' value={job} rerollFunction={() => RerollOneJob(index)} /> but now </>
              )
            } else {
              return (
                <>is a <RandomizedValue key={index} name='Job' value={job} rerollFunction={() => RerollOneJob(index)} /></>
              )
            }
          }
        )
      }
      ]
      </>
    );
  }

  const PersonalityQuirks = () => {
    return (
      <>
      <CasinoIcon color="success" onClick={() => RandomPersonalityQuirks()}/> [
      {
        personalityQuirks.map(
          (pq, index) => {
            if (index ===0 && personalityQuirks.length > 1) {
              return (
                <><RandomizedValue key={index} name='Personality Quirk' value={pq} rerollFunction={() => RerollOnePersonalityQuirk(index)} /> and </>
              )
            } else {
              return (
                <><RandomizedValue key={index} name='Personality Quirk' value={pq} rerollFunction={() => RerollOnePersonalityQuirk(index)} /></>
              )
            }
          }
        )
      }
      ]
      </>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#282c45', flexWrap: 'wrap', maxWidth: '85%' }}>
        <span><CasinoIcon color="success" onClick={() => RollAllValues()}/> [</span>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: '#282c45', flexWrap: 'wrap', maxWidth: '85%' }}>
          <RandomizedValue name='First Name' value={firstName} rerollFunction={() => RollValue('randomizer/firstName', setFirstName)} />
          <RandomizedValue name='Last Name' value={lastName} rerollFunction={() => RollValue('randomizer/lastName', setLastName)} />, aka
          <RandomizedValue name='Alias' value={alias} rerollFunction={() => RollValue('randomizer/alias', setAlias)} />, is {AorAn(adjective)}
          <RandomizedValue name='Adjective' value={adjective} rerollFunction={() => RollValue('randomizer/adjective', setAdjective)} />
          <RandomizedValue name='Race' value={race} rerollFunction={() => RollValue('randomizer/race', setRace)} />
          <RandomizedValue name='Metatype' value={metatype} rerollFunction={() => RollValue('randomizer/metatype', setMetatype)} /> from
          <RandomizedValue name='Origin' value={origin} rerollFunction={() => RollValue('randomizer/origin', setOrigin)} />.
          <RandomizedValue name='Gender' value={gender} rerollFunction={() => setGender(RandomGender())} /> has&nbsp;
          <IdentifyingFeatures /> and <Jobs />.
          <RandomizedValue name='Gender' value={gender} rerollFunction={() => setGender(RandomGender())} />
          <PersonalityQuirks />
        </div>
        <span>]</span>
      </div>
    </>
  );
};

export default Summary;