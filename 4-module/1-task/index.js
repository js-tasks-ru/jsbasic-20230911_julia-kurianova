function makeFriendsList(friends) {
  const ul = document.createElement("ul");
  friends.forEach((friend) => {
    ul.innerHTML += `<li>${friend.firstName} ${friend.lastName}</li>`;
  });
  return ul;
}
