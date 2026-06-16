if (Message.getControllerNumber() == 128) //Pitch wheel
    {
        ModPitchWheel.pnlPitch.setValue(Message.getControllerValue());
        ModPitchWheel.pnlPitch.repaint();
    }
    
	if (Message.getControllerNumber() == 1) //Mod wheel
    {
        ModPitchWheel.pnlMod.setValue(Message.getControllerValue());
        ModPitchWheel.pnlMod.repaint();
    }