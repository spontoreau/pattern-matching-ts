import { match, when } from "../src/match";

class Person {
  constructor(
    readonly firstName: string,
    readonly lastName: string
  ) { }
}

const sylvain = new Person("Sylvain", "Pontoreau");
const anders = new Person("Anders", "Hejlsberg");
const satya = new Person("Satya", "Nadella");

const getRole = <T extends Person>(person: T) => {
  return match(person)(
    when<T>(p => p.firstName === "Anders" && p.lastName === "Hejlsberg")(p => "Technical Fellow"),
    when<T>(p=> p.firstName === "Sylvain" && p.lastName === "Pontoreau")(p => "PFE"),
    when<T>(p => p.firstName === "Satya" && p.lastName === "Nadella")(p => "CEO")
  )(_ => "Unknow")
};

const isSylvain = match(sylvain)(
  when((p: Person) => p.firstName === "Sylvain")(p => true)
)(_ => false);

console.log(`Is Sylvain? => ${isSylvain}`);
console.log(getRole(sylvain));
console.log(getRole(anders));
console.log(getRole(satya));
console.log(getRole(new Person("Isaac", "Asimov")));
