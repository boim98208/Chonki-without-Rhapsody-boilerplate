 /*const var neuralNetwork = Engine.createNeuralNetwork("SinMix Best Amp Sim");
 const var namModel = FileSystem.getFolder(FileSystem.Samples)
                                .getChildFile("SinMix_BestAmpsim.nam")
                                .loadAsObject();
 
 neuralNetwork.loadNAMModel(namModel);*/function prepareToPlay(sampleRate, blockSize)
{
	
}
 function processBlock(channels)
{
    // After tanh has processed, just copy left to right
    // tanh only needs to have run on one channel
    var left = channels[0];
    var right = channels[1];
    var numSamples = left.length;
    
    for (var i = 0; i < numSamples; i++)
        right[i] = left[i];
}function onControl(number, value)
{
	
}
 