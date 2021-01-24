const VANITY = `
 _   __
| | / /
| |/ /  ___  ___  __ _  __ _ _ __
|    \\ / _ \\/ _ \\/ _\` |/ _\` | '_ \\
| |\\  \\  __/  __/ (_| | (_| | | | |
\\_| \\_/\\___|\\___|\\__, |\\__,_|_| |_|
 _                __/ |
( )              |___/
|/ _ __
  | '_ \\
  | | | |
  |_| |_|
  ___  _     _
 / _ \\(_)   | |
/ /_\\ \\_ ___| |__  _   _
|  _  | / __| '_ \\| | | |
| | | | \\__ \\ | | | |_| |
\\_| |_/_|___/_| |_|\\__,_|

...are getting married?

Answer:
Yes.

For those of you whose web browsers ONLY execute JavaScript and DO NOT render a DOM, you're in luck! Everything you need is right here in the console! Except for a lot of things. I will tell you, though, that the wedding will take place the weekend of August 14th, 2021, at Lord Thompson Manor in Connecticut. Connecticut is in the United States of America, in case you haven't been following the recent (geologically speaking) formation of said states.

Coming soon: "Keegan and Aishu's Wedding: A Text Adventure!"

...depending on how busy Keegan gets.

Also, this site is open source. I ain't no miser. I'm proud of it. Check it out:
https://github.com/kjleitz/keeshu-frontend

Submit issues, if you've got issues. I will promptly ignore them. Just kidding! I have no tests, so, uh, yeah that'd be great.

Submit PRs, if you've got REAL issues. I will actually look at them and viciously mock your code before begrudgingly merging them.
`;

export default function vanityLog(): void {
  console.log(VANITY);
}
