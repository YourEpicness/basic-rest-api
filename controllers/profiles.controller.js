// used for handling various OS paths
const path = require('path');


const profiles = [
    {
        id: 1,
        profile: 'First profile!'
    }
]
// best to write using function() instead of arrow function
function getProfiles(req, res) {
    res.json(profiles)
}

function postProfile(req, res){
    const newprofile = {
        id: profiles.length + 1,
        profile: req.body.profile
    }

    profiles.push(newprofile);
    res.status(201).json({newprofile})
}

function updateProfile(req, res) {
    const profileId = Number(req.params.id)
    console.log(`Updating profile at profileId:${profileId}...`)
    const profileIndex = profiles.findIndex(item => item.id === profileId)
    updatedprofile = {
        id: profileId,
        profile: req.body.profile
    }
    if(profileIndex === -1) {
        profiles.push(updatedprofile)
    } else {
        profiles.splice(profileIndex, 1, updatedprofile)
    }
    res.status(200).json(updatedprofile)
}

function deleteProfile(req, res) {
    const profileId = Number(req.params.id);
    console.log(`Looking for at profileId:${profileId}...`)
    const profileIndex = profiles.findIndex(item => item.id === profileId)
    console.log(profileIndex)
    profiles.splice(profileIndex, 1)
    res.json(profiles)
}

module.exports = {
    getProfiles,
    postProfile,
    updateProfile,
    deleteProfile
}