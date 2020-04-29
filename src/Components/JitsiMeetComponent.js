import React, { useState, useEffect } from 'react'
import ProgressComponent from '@material-ui/core/CircularProgress'
import { Grid } from '@material-ui/core'

const JitsiMeetComponent = () => {
	const [loading, setLoading] = useState(true)
	const containerStyle = {
		width: '1000px',
		height: '600px',
		minHeight: '100vh'
	}

	const jitsiContainerStyle = {
		display: (loading ? 'none' : 'block'),
		width: '100%',
		height: '100%',
		minHeight: '100vh'
	}

	const startConference = () => {
		try {
			const domain = 'meet.jit.si'
			const options = {
				roomName: 'Test-Meet',
				height: 400,
				parentNode: document.getElementById('jitsi-container'),
				interfaceConfigOverwrite: {
					filmStripOnly: false,
					SHOW_JITSI_WATERMARK: false,
				},
				configOverwrite: {
					disableSimulcast: false,
				},
			}

			const api = new window.JitsiMeetExternalAPI(domain, options)

			api.addEventListener('videoConferenceJoined', () => {
				console.log('Local User Joined')
				setLoading(false)
				api.executeCommand('displayName', 'Tadeo')
			})
		} catch (error) {
			console.error('Failed to load Jitsi API', error)
		}
	}

	useEffect(() => {
		if (window.JitsiMeetExternalAPI) startConference()
		else alert('Jitsi Meet API script not loaded')
	}, [])

	return (
		<Grid
		container
		spacing={0}
		direction="column"
		alignItems="center"
		justify="center"
			style={containerStyle}
		>
			{loading && <ProgressComponent />}
			<Grid
				id="jitsi-container"
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={jitsiContainerStyle}
			>
			</Grid>
		</Grid>
	)
}

export default JitsiMeetComponent