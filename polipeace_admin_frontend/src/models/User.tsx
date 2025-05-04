export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  party_affiliation: PartyAffiliation,
}

enum PartyAffiliation {
  'none',
  'lebanese forces', 
  'free patriotic movement', 
  'tashnag', 
  'kataeb', 
  'hezbollah', 
  'amal movement', 
  'marada movement', 
  'future movement',
  'progressive socialist party'
}