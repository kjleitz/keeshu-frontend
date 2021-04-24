const PASSCODES_TO_USER_TYPES = {
  lotus: "irl",
  lotis: "irl",
  iotus: "irl", // lowercase L or capital I? doesn't matter!
  balaji: "streamer",
  venkateswara: "streamer", // I'm telling you, it's the same guy!
  venkateshwara: "streamer",
  chootanoofadoofapoopy: "admin",
  chateauneufdupape: "admin", // I guess _some_ people spell it that way
} as const;

type PassCode = keyof typeof PASSCODES_TO_USER_TYPES;
export type UserType = (typeof PASSCODES_TO_USER_TYPES)[PassCode] | null;

// You could say, rightfully, "Authentication on the front end? In plain text?
// YOU'RE AN IDIOT!" And you'd be right: I am an idiot. However, there's
// literally nothing sensitive behind these passcodes... they're just here for
// UX. People who get the passcode "lotus" on their invitation will see the RSVP
// and registry and whatever. People who get the passcode "balaji" on their
// invitation will see the streaming option instead. The only reason we're
// hiding stuff for the latter is so they don't feel obligated to get us a gift
// or think they need to respond to the RSVP. If they (or you, our dear reader)
// end up seeing the other stuff... welp, no harm done!1
export default function auth(rawPasscode: string): UserType {
  const passcode = `${rawPasscode}`.replace(/[^A-Za-z]/g, '').toLowerCase() as PassCode;
  return PASSCODES_TO_USER_TYPES[passcode] || null;
}
