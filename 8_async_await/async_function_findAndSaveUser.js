async function findAndSaveUser(Users) {
    let user = await Users.findOne({});  // resolve 될 때까지 기다린 뒤 다음 로직으로 넘어감.
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    // 생략
}