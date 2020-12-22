import StateAbbrev from "@/types/StateAbbrev";

export default interface HotelDeets {
  title: string;
  address1: string;
  address2: string;
  city: string;
  state: StateAbbrev;
  zipcode: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  distance: string;
}
