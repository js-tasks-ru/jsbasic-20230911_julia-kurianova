function showSalary(users, age) {
  return users
    .filter((item) => item.age <= age)
    .map((item) => `${item.name}, ${item.balance}\n`)
    .join("")
    .slice(0, -1);
}
