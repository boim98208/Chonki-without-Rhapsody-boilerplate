 function onNoteOn()
{
	local RRToPlay;

	detectKeyswitch(Message.getNoteNumber());
	
	if(Message.getNoteNumber >= LOWESTNOTE && Message.getNoteNumber() <= HIGHESTNOTE)
		changeToneWithVelocityIfEnabled(Message.getVelocity());
	
	//RR groups start on 1, so I'm incrementing RRCounter to start on 1, but RRsToGoThrough to start at 0.
	
	if(artificialRRsEnabled){
		RRToPlay = RRsToGoThrough[RRCounter - 1];
	}else{
		RRToPlay = RRCounter % (NUMOFRRS/2) + 1;
	}
	
	
	shuffleRRsIfNeeded();
	incrementRRCounter();
	

	setRRForSamplers(RRToPlay);

	if(articulationPlaying == 0){
		ArticulationPlayingLabel.set("text", "Sustain");
	}else if(articulationPlaying == 1){
		ArticulationPlayingLabel.set("text", "Mute");
	}else {
		ArticulationPlayingLabel.set("text", "Loose Mute");
	}
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	ToolTipPanel.set("text",Content.getCurrentTooltip());
}
 function onControl(number, value)
{
	
}
 