function updateCharacterProfile(characterDetails){
    console.log(characterDetails);
    $(".heading").text(characterDetails.name)
    $(".height-info").text(characterDetails.height)
    $("p").text(characterDetails.about)
    $(".subheading").text(characterDetails.type)
    $(".rating-info").text(characterDetails.rating)

    // $(".inheritors-info").text(characterDetails.inheritors.join(' | '))

    $(".abilities-info").text(characterDetails.abilities)
    $(".logo-img").attr("src", `${characterDetails.image}`)
}

aotRepo.get.all(1, (r) => {updateCharacterProfile(r[0])}, () => {});