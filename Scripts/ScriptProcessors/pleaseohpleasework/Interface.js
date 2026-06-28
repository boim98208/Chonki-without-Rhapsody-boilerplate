 Synth.setFixNoteOnAfterNoteOff(true);
 
 const var secondChord = [50, 57, 63, 66];
 const var thirdChord = [49, 56, 61, 65];
 const var fourthChord = [47, 54, 59, 63];
 const var fifthChord = [46, 53, 58, 61];
 const var sixthChord = [46, 53, 56, 62];
 const var firstChord = [51, 58, 63, 66];
 
 
 const var maxNoteIds = 8;
 reg testIds = [];
 testIds.reserve(maxNoteIds);
 reg i = 0;
 
 var testNotes = [];
 testNotes.reserve(maxNoteIds);
 for(i = 0; i < maxNoteIds; i++){
	 testNotes.push(-1);
	 testIds.push(-1);
 }
 


const var SourceSusRelAHDSR = Synth.getModulator("SourceSusRelAHDSR");
const var AllSusRelAHDSR = Synth.getAllModulators("SusRelAHDSR");

const var SourcePitchBendModulator = Synth.getModulator("SourcePitchBendModulator");
const var AllPitchBendModulator = Synth.getAllModulators("PitchBendModulator");

const var SourceSusAHDSR = Synth.getModulator("SourceSusAHDSR");
const var AllSusAHDSR = Synth.getAllModulators("SusAHDSR");


const var SourceLooseMuteAHDSR = Synth.getModulator("SourceLooseMuteAHDSR");
const var AllLooseMuteAHDSR = Synth.getAllModulators("LooseMuteAHDSR");

inline function copyModulatorParams(source, target)
{
	for(var j = 0; j < target.length; j++){

    for (i = 0; i < source.getNumAttributes(); i++)
    {
        target[j].setAttribute(i, source.getAttribute(i));
    }
    
    }
}

copyModulatorParams(SourceSusRelAHDSR, AllSusRelAHDSR);

copyModulatorParams(SourceSusAHDSR, AllSusAHDSR);


include("GlobalConstants.js");


Content.makeFrontInterface(1000, 710);

const var ToolTipPanel = Content.getComponent("ToolTipPanel");

const var mh = Engine.createMidiAutomationHandler();

const var mh = Engine.createMidiAutomationHandler();
var ccAssignments = [];

inline function assignCC(knobId, ccNumber)
{
    local knob = Content.getComponent(knobId);
    local knobMin = knob.get("min");
    local knobMax = knob.get("max");
    
    ccAssignments.push({
        "Controller": ccNumber,
        "Channel": -1,
        "Processor": "Interface",
        "Attribute": knobId,
        "MacroIndex": -1,
        "Start": knobMin,
        "End": knobMax,
        "FullStart": knobMin,
        "FullEnd": knobMax,
        "Skew": 1.0,
        "Interval": 0.01,
        "Inverted": false
    });
}

inline function applyCC()
{
    mh.setAutomationDataFromObject(ccAssignments);
}

assignCC("VibratoAmountKnob", 1);

assignCC("VibratoFrequencyKnob", 2);

/*const var String8SusMute = Synth.getMidiProcessor("String8SusMute");
const var String3SusMute = Synth.getMidiProcessor("String3SusMute");
const var String8MuteMute = Synth.getMidiProcessor("String8MuteMute");
const var String3MuteMute = Synth.getMidiProcessor("String3MuteMute");
*/


const var String3SusSamplerRight = Synth.getChildSynth("String3SusSamplerRight");
const var String8MuteSamplerRight = Synth.getChildSynth("String8MuteSamplerRight");
const var String8SusSamplerRight = Synth.getChildSynth("String8SusSamplerRight");
const var String3MuteSamplerRight = Synth.getChildSynth("String3MuteSamplerRight");
const var LooseMuteSamplerRight = Synth.getChildSynth("LooseMuteSamplerRight");

//sus is 0, mute is 1, loose is 2
var articulationPlaying = 0;


inline function resetKeyswitchColors(){
Engine.setKeyColour(SUSKEYSWITCH, Colours.withAlpha(Colours.red, 0.5)); 
Engine.setKeyColour(MUTEKEYSWITCH, Colours.withAlpha(Colours.red, 0.5)); 
Engine.setKeyColour(LOOSEMUTEKEYSWITCH, Colours.withAlpha(Colours.red, 0.5)); 
}


Engine.setKeyColour(42, Colours.withAlpha(Colours.red, 0.5)); 
Engine.setKeyColour(StrummingKeyswitch.downStrumKeyswitch, Colours.withAlpha(Colours.red, 0.2)); 

Engine.setKeyColour(StrummingKeyswitch.upStrumKeyswitch, Colours.withAlpha(Colours.red, 0.2)); 

var artificialRRsEnabled = false;
var toneWithVelocityEnabled = false;


const var LeftGuitarSusMute = Synth.getMidiProcessor("LeftGuitarSusMute");
const var RightGuitarSusMute = Synth.getMidiProcessor("RightGuitarSusMute");

const var LeftGuitarMuteMute = Synth.getMidiProcessor("LeftGuitarMuteMute");
const var RightGuitarMuteMute = Synth.getMidiProcessor("RightGuitarMuteMute");

const var LeftGuitarLooseMute = Synth.getMidiProcessor("LeftGuitarLooseMute");
const var RightGuitarLooseMute = Synth.getMidiProcessor("RightGuitarLooseMute");

const var String8to4MuteMute = Synth.getMidiProcessor("String8to4MuteMute");
const var String3MuteMute = Synth.getMidiProcessor("String3MuteMute");
const var String8MuteMute = Synth.getMidiProcessor("String8MuteMute");

const var RightString3MuteMute = Synth.getMidiProcessor("RightString3MuteMute");
const var RightString8MuteMute = Synth.getMidiProcessor("RightString8MuteMute");
const var RightString8to4MuteMute = Synth.getMidiProcessor("RightString8to4MuteMute");


// Add in the ones from the right later

const var AllString8to4MuteMutes = [String8to4MuteMute, RightString8to4MuteMute];

const var AllString3And8MuteMutes = [String3MuteMute, String8MuteMute, RightString3MuteMute, RightString8MuteMute];


const var String8to4SusMute = Synth.getMidiProcessor("String8to4SusMute");
const var String3SusMute = Synth.getMidiProcessor("String3SusMute");
const var String8SusMute = Synth.getMidiProcessor("String8SusMute");

const var RightString8SusMute = Synth.getMidiProcessor("RightString8SusMute");
const var RightString3SusMute = Synth.getMidiProcessor("RightString3SusMute");
const var RightString8to4SusMute = Synth.getMidiProcessor("RightString8to4SusMute");


// Add in the ones from the right later

const var AllString8to4SusMutes = [String8to4SusMute, RightString8to4SusMute];

const var AllString3And8SusMutes = [String3SusMute, String8SusMute, RightString3SusMute, RightString8SusMute];


const var AllSusSamplerMutes = [LeftGuitarSusMute, RightGuitarSusMute];

const var AllMuteSamplerMutes = [LeftGuitarMuteMute, RightGuitarMuteMute];

const var AllLooseSamplerMutes = [LeftGuitarLooseMute, RightGuitarLooseMute];



inline function setAllSamplersMuted(SamplerMutes){
	for(var i = 0; i < SamplerMutes.length; i++){
		SamplerMutes[i].setAttribute("Bypass", true);
	}
}

inline function setAllSamplersUnmuted(SamplerMutes){
	for(var i = 0; i < SamplerMutes.length; i++){
		SamplerMutes[i].setAttribute("Bypass", false);
	}
}

setAllSamplersUnmuted(AllSusSamplerMutes);
setAllSamplersMuted(AllMuteSamplerMutes);
setAllSamplersMuted(AllLooseSamplerMutes);


// keyswitching and choosing to latch system
const var EnableLatchChoiceBtn = Content.getComponent("EnableLatchChoiceBtn");

var latchingChoiceEnabled = EnableLatchChoiceBtn.getValue();
var latchedKeyswtich = ArticulationType.Sustain;

var strummingEnabled = false;
var isCurrentlyStrumming = false;

inline function onEnableLatchChoiceBtnControl(component, value)
{
	latchingChoiceEnabled = value;
	latchedKeyswtich = articulationPlaying;
};

Content.getComponent("EnableLatchChoiceBtn").setControlCallback(onEnableLatchChoiceBtnControl);

inline function isAKeyswitch(notePlayed){
	local lowestKeyswitch = SUSKEYSWITCH;
	local highestKeyswitch = LOOSEMUTEKEYSWITCH;
	

	return isBetweenIncl(lowestKeyswitch, highestKeyswitch, notePlayed);
}

inline function detectKeyswitch(notePlayed, noteVelocity){

	  if(isCurrentlyStrumming){
        releaseStrumKey(StrummingKeyswitch.downStrumKeyswitch);
    }
	
	if(!latchingChoiceEnabled){

	
		return detectKeyswitchNoLatch(notePlayed);
	}else{
	
		if(noteVelocity >= 120){
			latchedKeyswtich = notePlayed;
		}
		
		return detectKeyswitchNoLatch(notePlayed);
	}

	
}

inline function detectKeyswitchNoLatch(notePlayed){
	

	if(notePlayed == SUSKEYSWITCH){
		resetKeyswitchColors();
		
	
		articulationPlaying = ArticulationType.Sustain;
		
		setAllSamplersMuted(AllMuteSamplerMutes);
		setAllSamplersMuted(AllLooseSamplerMutes);
		setAllSamplersUnmuted(AllSusSamplerMutes);
		
		
		for(var i = LOWESTNOTE; i < HIGHESTNOTE + 1; i++){
			Engine.setKeyColour(i, 	Colours.withAlpha(0xB2EDE9, 0.5)); 
		
		}
		
		Engine.setKeyColour(SUSKEYSWITCH, Colours.withAlpha(0x821916, 0.5)); 
		
	}else if(notePlayed == MUTEKEYSWITCH){
		resetKeyswitchColors();
	
		articulationPlaying = ArticulationType.Mute;
	
		setAllSamplersUnmuted(AllMuteSamplerMutes);
		setAllSamplersMuted(AllLooseSamplerMutes);
		setAllSamplersMuted(AllSusSamplerMutes);
		
		for(var i = LOWESTNOTE; i < HIGHESTNOTE + 1; i++){
			Engine.setKeyColour(i, 	Colours.withAlpha(0xB2EDE9, 0.5)); 
		
		}
		
		Engine.setKeyColour(MUTEKEYSWITCH, Colours.withAlpha(0x821916, 0.5)); 
		
	}if(notePlayed == LOOSEMUTEKEYSWITCH){
		resetKeyswitchColors();
	
		articulationPlaying = ArticulationType.LooseMute;
	
		setAllSamplersMuted(AllMuteSamplerMutes);
		setAllSamplersUnmuted(AllLooseSamplerMutes);
		setAllSamplersMuted(AllSusSamplerMutes);
	
		
		for(var i = LOWESTNOTE; i <= 67; i++){
			Engine.setKeyColour(i, Colours.withAlpha(0xB2EDE9, 0.5)); 
		}
		
		for(var i = 68; i < HIGHESTNOTE + 1; i++){
			Engine.setKeyColour(i, Colours.transparentBlack);
		}
		
		Engine.setKeyColour(LOOSEMUTEKEYSWITCH, Colours.withAlpha(0x821916, 0.5)); 
		
		
	}else{
		return false;
	}
}

// default to sustain
detectKeyswitch(SUSKEYSWITCH, 100);


const var SamplersLeft = [];
SamplersLeft.reserve(7);

SamplersLeft.push(Synth.getSampler("String8SusSampler"));
SamplersLeft.push(Synth.getSampler("String8MuteSampler"));
SamplersLeft.push(Synth.getSampler("String3SusSampler"));
SamplersLeft.push(Synth.getSampler("String3MuteSampler"));
SamplersLeft.push(Synth.getSampler("LooseMuteSampler"));

SamplersLeft.push(Synth.getSampler("String8to4SusSampler"));
SamplersLeft.push(Synth.getSampler("String8to4MuteSampler"));

const var SamplersRight = [];
SamplersRight.reserve(7);

SamplersRight.push(Synth.getSampler("String8SusSamplerRight"));
SamplersRight.push(Synth.getSampler("String8MuteSamplerRight"));
SamplersRight.push(Synth.getSampler("String3SusSamplerRight"));
SamplersRight.push(Synth.getSampler("String3MuteSamplerRight"));
SamplersRight.push(Synth.getSampler("LooseMuteSamplerRight"));

SamplersRight.push(Synth.getSampler("String8to4SusSamplerRight"));
SamplersRight.push(Synth.getSampler("String8to4MuteSamplerRight"));


reg RRsToGoThrough = [1, 2, 3, 4];

// he needs to start at 2
reg RRCounter = 2;


for(var i = 0; i < SamplersLeft.length; i++){
	SamplersLeft[i].enableRoundRobin(false);
	SamplersRight[i].enableRoundRobin(false);

}

inline function setRRForSamplers(RR){
	local stringSelectValue = StringSelectKnob.getValue();
	local RROffset;
	
	// This RROffset is cringe and is only here because of the samplers and their weird RR setup
	// Dont ever do stuff like this again please
	if(stringSelectValue == 0 && articulationPlaying != ArticulationType.LooseMute){
		RROffset = 1;
	}else{
		RROffset = 2;
	}
	
	
		for(var i = 0; i < SamplersLeft.length; i++){
			SamplersLeft[i].setActiveGroup(RR);
			
			// The + 1 at the end prevents 0 as an argument
			SamplersRight[i].setActiveGroup((RR + RROffset) % NUMOFRRS + 1);
		
		}
}

inline function incrementRRCounter(){
	if(RRCounter > 3){
		RRCounter = 1;
	}else{
		RRCounter++;
	}
}

inline function shuffleArray(arr)
{
    for (i = arr.length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}


inline function shuffleRRsIfNeeded(){
	local lastRRPlayed = RRsToGoThrough[NUMOFRRS - 1];

	if(RRCounter > NUMOFRRS - 1){
		RRsToGoThrough = shuffleArray(RRsToGoThrough);
	
		while(lastRRPlayed == RRsToGoThrough[0]){
		RRsToGoThrough = shuffleArray(RRsToGoThrough);
		}
	}
}

const var ArtificalRRsBtn = Content.getComponent("ArtificalRRsBtn");


inline function onArtificalRRsBtnControl(component, value)
{
	artificialRRsEnabled = value;
};

Content.getComponent("ArtificalRRsBtn").setControlCallback(onArtificalRRsBtnControl);




// Double tracking

const var LeftGuitarGain = Synth.getEffect("LeftGuitarGain");

const var RightGuitarGain = Synth.getEffect("RightGuitarGain");

const var RightGuitarMute = Synth.getMidiProcessor("RightGuitarMute");

RightGuitarGain.setAttribute(RightGuitarGain.Balance, 100.0);

RightGuitarGain.setAttribute(RightGuitarGain.Gain, 0.0);

RightGuitarMute.setAttribute("Bypass", false);

inline function onDoubleTrackingBtnControl(component, value)
{
	if(value){
		RightGuitarMute.setAttribute("Bypass", false);
		RightGuitarGain.setAttribute(RightGuitarGain.Gain, 0.0);
		
		LeftGuitarGain.setAttribute(LeftGuitarGain.Balance, -100.0);
		
	}else{
		RightGuitarMute.setAttribute("Bypass", true);
		RightGuitarGain.setAttribute(RightGuitarGain.Gain, -100.0);
		
		LeftGuitarGain.setAttribute(LeftGuitarGain.Balance, 0);
	}
};

Content.getComponent("DoubleTrackingBtn").setControlCallback(onDoubleTrackingBtnControl);

const var DoubleTrackingBtn = Content.getComponent("DoubleTrackingBtn");




// Changing tone with velocity

inline function onToneVelocityBtnControl(component, value)
{
	toneWithVelocityEnabled = value;
};

Content.getComponent("ToneVelocityBtn").setControlCallback(onToneVelocityBtnControl);

inline function linMap(value, inMin, inMax, outMin, outMax)
{
    return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
}

const var ToneKnob = Content.getComponent("ToneKnob");

const var ConvolutionReverb1 = Synth.getEffect("Convolution Reverb1");
const var ConvolutionReverb2 = Synth.getEffect("Convolution Reverb2");

// Load IRs if needed
const irs = Engine.loadAudioFilesIntoPool();
const var ConvolutionReverb1Sample = Synth.getAudioSampleProcessor("Convolution Reverb1");
const var ConvolutionReverb2Sample = Synth.getAudioSampleProcessor("Convolution Reverb2");
ConvolutionReverb1Sample.setFile(irs[0]);
ConvolutionReverb2Sample.setFile(irs[1]);

inline function linToDb(lin)
{
    if (lin <= 0.0)
        return -100.0;
    return 20.0 * Math.log10(lin);
}

inline function changeToneValue(value){
	local dry1, wet1, dry2, wet2;
	
	if (value <= 0.5)
	{
	    local t = value / 0.5;
	
	    dry1 = Math.cos(Math.PI * t / 2);
	    wet1 = Math.sin(Math.PI * t / 2);
	    dry2 = 1.0;
	    wet2 = 0.0;
	}
	else
	{
	    local t = (value - 0.5) / 0.5;
	
	    dry1 = 0.0;
	    wet1 = 1.0;
	    dry2 = Math.cos(Math.PI * t / 2);
	    wet2 = Math.sin(Math.PI * t / 2);
	}
	
	// Compensation: +6dB at t=0.5, +12dB at t=1.0
	// Two cascaded equal-power crossfades each lose ~3dB at mid-point
	// Need to make up 6dB at the half and 12dB at the full
	local compensationDb;
	if (value <= 0.5)
	{
	    // Ramps from 0 to +6dB
	    local t = value / 0.5;
	    compensationDb = 6.0 * t;
	}
	else
	{
	    // Ramps from +6 to +12dB
	    local t = (value - 0.5) / 0.5;
	    compensationDb = 6.0 + 6.0 * t;
	}
	
	ConvolutionReverb1.setAttribute(ConvolutionReverb1.DryGain,  linToDb(dry1) + compensationDb);
	ConvolutionReverb1.setAttribute(ConvolutionReverb1.WetGain,  linToDb(wet1) + compensationDb);
	ConvolutionReverb2.setAttribute(ConvolutionReverb2.DryGain,  linToDb(dry2));
	ConvolutionReverb2.setAttribute(ConvolutionReverb2.WetGain,  linToDb(wet2));
}

inline function onToneKnobControl(component, value)
{
	changeToneValue(value);
}

inline function changeToneWithVelocityIfEnabled(velocity){
	local newToneValue;

	if(toneWithVelocityEnabled){
		newToneValue = linMap(velocity, 0, 127, 0, 1);
		changeToneValue(newToneValue);
		ToneKnob.setValue(newToneValue);
	}else{
		return;
	}
}

ToneKnob.setControlCallback(onToneKnobControl);


for(var i = LOWESTNOTE; i < HIGHESTNOTE + 1; i++){
	Engine.setKeyColour(i, 	Colours.withAlpha(0xB2EDE9, 0.5)); 

}

// Vibrato knobs

const var numOfLFOModulators = 5 * 2; // 5 modulators and 2 guitars

const var VibratoLFOModulators = Synth.getAllModulators("VibratoLFO");


//VibratoLFO.setIntensity(float newIntensity)
//VibratoLFO.setAttribute(VibratoLFO.Frequency, 8.0)


inline function changeVibratoLFOs(intensity, frequency, LFOs){
	local LFOModulator = LFOs[0];

	for(var i = 0; i < LFOs.length; i++){
		LFOModulator = LFOs[i];
		LFOModulator.setIntensity(intensity);
		LFOModulator.setAttribute(LFOModulator.Frequency, frequency);
	}
}

inline function changeVibratoLFOIntensity(intensity, LFOs){
	local LFOModulator = LFOs[0];

	for(var i = 0; i < LFOs.length; i++){
		LFOModulator = LFOs[i];
		LFOModulator.setIntensity(intensity);
	}
}

inline function changeVibratoLFOFrequency(frequency, LFOs){
	local LFOModulator = LFOs[0];

	for(var i = 0; i < LFOs.length; i++){
		LFOModulator = LFOs[i];
		LFOModulator.setAttribute(LFOModulator.Frequency, frequency);
	}
}



inline function onVibratoAmountKnobControl(component, value)
{
	changeVibratoLFOIntensity(value, VibratoLFOModulators);
};

Content.getComponent("VibratoAmountKnob").setControlCallback(onVibratoAmountKnobControl);



inline function onVibratoFrequencyKnobControl(component, value)
{
	changeVibratoLFOFrequency(value, VibratoLFOModulators);
};

Content.getComponent("VibratoFrequencyKnob").setControlCallback(onVibratoFrequencyKnobControl);


// Pitch Bend Knob

const var PitchBendModulators = Synth.getAllModulators("PitchBendModulator");




inline function changePitchBendRange(range, PBModulators){
	local PBModulator = PBModulators[0];

	for(var i = 0; i < PBModulators.length; i++){
		PBModulator = PBModulators[i];
		PBModulator.setIntensity(range);
	}
}


inline function onPitchBendRangeKnobControl(component, value)
{
	changePitchBendRange(value, PitchBendModulators);
};

Content.getComponent("PitchBendRangeKnob").setControlCallback(onPitchBendRangeKnobControl);

// default to 2 st PB range
changePitchBendRange(2, PitchBendModulators);


const var StringSelectKnob = Content.getComponent("StringSelectKnob");


inline function onStringSelectKnobControl(component, value)
{
	if(value == 0){
		StringSelectKnob.set("text", "All Strings Enabled");
	
		setAllSamplersMuted(AllString3And8MuteMutes);
		setAllSamplersMuted(AllString3And8SusMutes);
		setAllSamplersUnmuted(AllString8to4MuteMutes);
		setAllSamplersUnmuted(AllString8to4SusMutes);
	}else{
		
		StringSelectKnob.set("text", "Low String Focused");
	
		setAllSamplersUnmuted(AllString3And8MuteMutes);
		setAllSamplersUnmuted(AllString3And8SusMutes);
		setAllSamplersMuted(AllString8to4MuteMutes);
		setAllSamplersMuted(AllString8to4SusMutes);
	}
};

Content.getComponent("StringSelectKnob").setControlCallback(onStringSelectKnobControl);



// GUI

const var ArticulationPlayingLabel = Content.getComponent("ArticulationPlayingLabel");

const var SettingsTile = Content.getComponent("SettingsTile");



inline function onShowSettingsBtnControl(component, value)
{
	if(value){
		SettingsTile.set("visible", true);
	}else{
		SettingsTile.set("visible", false);
	}
	
};

Content.getComponent("ShowSettingsBtn").setControlCallback(onShowSettingsBtnControl);


// Strumming engine functions

inline function printArray(array){
	for (i = 0; i < array.length; i++){
		Console.print(array[i]);
	}
}

// dont forget to correlate the note delay with velocity or cc in some way

const var maxNotesFiltered = 8;
const var notesFiltered = [];
notesFiltered.reserve(maxNotesFiltered);

for(i = 0; i < maxNotesFiltered; i++){
	notesFiltered.push(-1);
}

const var EnableStrummingBtn = Content.getComponent("EnableStrummingBtn");

inline function onEnableStrummingBtnControl(component, value)
{
	if(value){
		strummingEnabled = true;
	}else{
		strummingEnabled = false;
	}
};

Content.getComponent("EnableStrummingBtn").setControlCallback(onEnableStrummingBtnControl);

var noteCount = 0;

inline function strumIfStrumKeyPressed(notePlayed, notes, noteVelocity){

Message.delayEvent(1);

local indexOfNotePlaying = 0;

	if(notePlayed != StrummingKeyswitch.downStrumKeyswitch && notePlayed != StrummingKeyswitch.upStrumKeyswitch){
		return false;
	}
	
	Message.ignoreEvent(true);
	notes.sort();
	
	
	// getting all the non negative notes from lowest to highest
	
	for(i = 0; i < notes.length; i++){
		if(notes[i] != -1){
			notesFiltered[indexOfNotePlaying] = notes[i];
			
			// remove the times noteCount gets modified please
			indexOfNotePlaying++;
		}
	}
	

	
	if(isCurrentlyStrumming){
		releaseStrumKey(StrummingKeyswitch.downStrumKeyswitch);
	}else{
		isCurrentlyStrumming = true;
	}
		
	if(notePlayed == StrummingKeyswitch.downStrumKeyswitch){
		downStrum(notesFiltered, noteVelocity);
		return true;
	}
	
	if(notePlayed == StrummingKeyswitch.upStrumKeyswitch){
		upStrum(notesFiltered, noteVelocity);
		return true;
	}
	
}

inline function releaseStrumKey(noteReleased){
	
	
	if(noteReleased != StrummingKeyswitch.downStrumKeyswitch && noteReleased != StrummingKeyswitch.upStrumKeyswitch){
		return false;
	}
	
	for(i = 0; i < testIds.length; i++){
		
		if(testIds[i] != -1){
			
	/*	
	At the moment , randomizing a delayed off time seems to create hanging notes so I'll just keep with making it a super fast release
		Synth.noteOffDelayedByEventId(testIds[i], Math.randInt(0, 10) * Engine.getSamplesForMilliSeconds(2));
	*/
	
	Synth.noteOffDelayedByEventId(testIds[i], Math.random() * Engine.getSamplesForMilliSeconds(10));
		testIds[i] = -1;
			}
		}
		
		isCurrentlyStrumming = false;


	
	
}

const var fastestNoteDelay = 5;

const var slowestNoteDelay = 90;



inline function downStrum(notes, noteVelocity){
	

	local delayMS = linMap(noteVelocity, 1, 127, slowestNoteDelay, fastestNoteDelay);
	
	local delaySamples = Engine.getSamplesForMilliSeconds(delayMS);
	

	for(var j = 0; j < notes.length && isCurrentlyStrumming; j++){

	if(testIds[j] != -1){
		Synth.noteOffByEventId(testIds[j]);
		Console.print("should be cleaned up");
	}
	if(notes[j] != -1){
		testIds[j] = Synth.addNoteOn(1, notes[j], noteVelocity, delaySamples * j);
		}
		
	}
}

inline function upStrum(notes, noteVelocity){
	// reversing the notes before passing it onto downstrum
    local temp;
    for (var i = 0; i < noteCount / 2; i++)
    {
        temp = notes[i];
        notes[i] = notes[noteCount - 1 - i];
        notes[noteCount - 1 - i] = temp;
    }
    
    downStrum(notes, noteVelocity);
}


// timer for tooltips to display

Synth.startTimer(0.5);


// Getting the Midi CCs in place

//applyCC();

inline function isBetweenIncl(lowBound, highBound, num){
	if(num >= lowBound && num <= highBound){
		return true;
	}else{
		return false;
	}
}
function onNoteOn()
{


	local RRToPlay;
	local notePlayed = Message.getNoteNumber();
	local noteVelocity = Message.getVelocity();
	
	
	if(isAKeyswitch(notePlayed)){
		detectKeyswitch(notePlayed, noteVelocity);
		
		if(articulationPlaying == 0){
			ArticulationPlayingLabel.set("text", "Sustain");
		}else if(articulationPlaying == 1){
			ArticulationPlayingLabel.set("text", "Mute");
		}else {
			ArticulationPlayingLabel.set("text", "Loose Mute");
		}
	}
	
	if(notePlayed >= LOWESTNOTE && notePlayed <= HIGHESTNOTE){
		
	
		testNotes[noteCount] = notePlayed;
		noteCount++;
		
		if(strummingEnabled){
		Message.ignoreEvent(true);
		}
		
		changeToneWithVelocityIfEnabled(noteVelocity);
		
	}
	
	strumIfStrumKeyPressed(notePlayed, testNotes, noteVelocity);
	
	//RR groups start on 1, so I'm incrementing RRCounter to start on 1, but RRsToGoThrough to start at 0.
	
	if(artificialRRsEnabled){
			RRToPlay = RRsToGoThrough[RRCounter - 1];
	}else{
		RRToPlay = RRCounter % (NUMOFRRS/2) + 1;
	}
		
		
	shuffleRRsIfNeeded();
	incrementRRCounter();
		
		
	setRRForSamplers(RRToPlay);

	
	
/*	if(isBetweenIncl(LOWESTNOTE, HIGHESTNOTE, notePlayed)){
		Message.setNoteNumber(notePlayed + 2);
	}
*/	
}
 function onNoteOff()
{
	local RRToPlay;
	local noteReleased = Message.getNoteNumber();
	local noteVelocity = Message.getVelocity();
	local indexOfReleasedNote;
	
	if(isAKeyswitch(notePlayed) && latchingChoiceEnabled){
		detectKeyswitchNoLatch(latchedKeyswtich);
	}
	
	
	releaseStrumKey(noteReleased);
	
	if(testNotes.contains(noteReleased)){
		indexOfReleasedNote = testNotes.indexOf(noteReleased, 0, 0);
		testNotes[indexOfReleasedNote] = -1;
		noteCount--;
	}
	
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
 