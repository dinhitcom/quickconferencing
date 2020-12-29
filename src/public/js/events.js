import helpers from './helpers.js';

window.addEventListener( 'load', () => {
    //console.log(window.location.href)
    let roomLink = document.getElementById('room-link')
    roomLink.value = window.location.href;
    roomLink.focus();
    roomLink.select();
    
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;

        if ( roomName && yourName ) {
            document.querySelector( '#err-msg' ).innerHTML = "";

            sessionStorage.setItem( 'username', yourName );

            let roomLink = `${ location.origin }?room=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;

            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
            window.location.replace(roomLink);
        }

        else {
            document.querySelector( '#err-msg' ).innerHTML = "All fields are required";
        }
    } );

    document.getElementById('enter-room').addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector('#username').value;

        if ( name ) {
            document.querySelector('#err-msg-username').innerHTML = "";

            sessionStorage.setItem('username', name );

            location.reload();
        }

        else {
            document.querySelector('#err-msg-username').innerHTML = "Please input your name";
        }
    } );


    document.addEventListener('click', (e) => {
        if ( e.target && e.target.classList.contains('expand-remote-video') ) {
            helpers.maximiseStream(e);
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );
