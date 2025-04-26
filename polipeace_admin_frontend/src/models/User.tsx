export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  party_affiliation: PartyAffiliation,
}

enum PartyAffiliation {
  'ouwet', 
  'aoun', 
  'dashnak', 
  'kataeb', 
  'hezbollah', 
  'haraket amal', 
  'marada aovement', 
  'progressive socialist party'
}