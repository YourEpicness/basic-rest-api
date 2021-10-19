// used for handling various OS paths
const path = require('path');

let timestamp = Date.now();
let current_dt = new Date(timestamp);

const profiles = [
    {
        id: 1,
        date_created: current_dt,
        profile: {
            name: "John Doe",
            about: "This is a dummy person"
        }
    }
]
// best to write using function() instead of arrow function
function getProfiles(req, res) {
    res.json(profiles)
}

function postProfile(req, res){
    const newProfile = {
        id: profiles.length + 1,
        date_created: current_dt,
        profile: req.body.profile
    }

    profiles.push(newProfile);
    res.status(201).json({newProfile})
}

function updateProfile(req, res) {
    const profileId = Number(req.params.id)
    console.log(`Updating profile at profileId:${profileId}...`)
    const profileIndex = profiles.findIndex(item => item.id === profileId)
    const updatedProfile = {
        id: profileId,
        profile: req.body.profile
    }
    if(profileIndex === -1) {
        profiles.push(updatedProfile)
    } else {
        profiles.splice(profileIndex, 1, updatedProfile)
    }
    res.status(200).json(updatedProfile)
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