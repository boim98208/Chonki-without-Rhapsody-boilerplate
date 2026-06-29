const var NUMOFRRS = 4;
const var maxNoteIds = 8;
const var SUSKEYSWITCH = 36;
const var MUTEKEYSWITCH = 37;
const var LOOSEMUTEKEYSWITCH = 38;
const var HIGHESTNOTE = 92;
const var LOWESTNOTE = 40;

namespace ArticulationType{
	const var Sustain = 0;
	const var Mute = 1;
	const var LooseMute = 2;
}

namespace StrummingKeyswitch{
	const var downStrumKeyswitch = 96;
	const var upStrumKeyswitch = 97;
	
	const var individualStrumKeyswitches = [98, 99, 100, 101, 102, 103, 104, 105];
	
	const var lowIndivStrumKeyswitch = individualStrumKeyswitches[0];
	const var highIndivStrumKeyswitch = individualStrumKeyswitches[maxNoteIds - 1];
}
