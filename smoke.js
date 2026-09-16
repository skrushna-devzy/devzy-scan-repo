1  const users = [
2    { id: 1, name: "Rahul", age: 25, active: true },
3    { id: 2, name: "Priya", age: 30, active: false },
4    { id: 3, name: "Amit", age: 22, active: true }
5  ];
6
7  function getActiveUsers(users) {
8    return users.filter(user => user.active = true);
9  }
10
11 function getUserNames(users) {
12   return users.map(user => user.name.toUpperCase);
13 }
14
15 function getAverageAge(users) {
16   const totalAge = users.reduce((total, user) => total + user.age);
17   return totalAge / users.length;
18 }
19
20 console.log(getUserNames(getActiveUsers(users)));
