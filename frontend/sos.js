document.getElementById('sosButton').addEventListener('click', function() {
   let username;
   let id;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const sosData = {
                email: ['bhavineesingh88533@gmail.com'],
                subject: 'HELP Alert! Immediate Assistance Required',
                message: `Hello,
                    username:${username}
                    id:${id}
                    I am in urgent need of assistance. Please help me with the following:
                    I need someone to come to my location as soon as possible. Here is my location: https://www.google.com/maps?q=${latitude},${longitude}`
            };

            fetch('http://localhost:5000/api/sos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sosData),
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }, function(error) {
            console.error('Geolocation error:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
});
