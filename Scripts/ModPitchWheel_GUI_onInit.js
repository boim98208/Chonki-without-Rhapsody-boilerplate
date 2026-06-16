Synth.deferCallbacks(true);

namespace ModPitchWheel
{
	var pnlMod;
	var pnlPitch;

    inline function makeModWheel(name)
    {
        pnlMod = Content.getComponent(name);
        
        pnlMod.setPaintRoutine(function(g)
        {    
            g.fillAll(this.get("bgColour"));
    
            var lineSize = this.get("borderSize");
            var linePos = Math.range(this.get("height")-((this.get("height")/this.get("max")) * this.getValue()), lineSize/2, this.get("height")-lineSize/2);

            //Draw value
            g.setColour(this.get("itemColour"));
            g.fillRect([0, linePos, this.get("width"), this.get("height")]);
        
            //Draw line
            g.setColour(this.get("itemColour2"));
            g.drawLine(0, this.get("width"), linePos, linePos, lineSize);    
        });
        
        pnlMod.setMouseCallback(function(event)
        {
            if (event.clicked)
            {
                // save the value from the mouse click
                this.data.mouseDownValue = this.getValue();
            }
            else
            {
                var newValue = this.getValue();
        
                if (event.drag)
                {
                    var distance  = (event.dragX - event.dragY) / 3; // Calculate the sensitivity value
                    newValue = Math.range(this.data.mouseDownValue + distance, this.get("min"), this.get("max"));
                }
                
                if (newValue != this.getValue()) //The value has changed
                {
                    this.setValue(newValue);
                    this.repaint();
                    this.changed();
                    Synth.sendController(1, newValue);
                }
        
            }
        });
    };
    
    inline function makePitchWheel(name)
    {
        pnlPitch = Content.getComponent(name); //Grab pitch wheel panel
        
        //Paint Routines
        pnlPitch.setPaintRoutine(function(g)
        {
            var lineSize = this.get("borderSize");
    
            //Calcluate the position to draw the line based on the panel's value (pitch wheel value)
            //use Math.range to account for the height of the line (lineSize)
            var linePos = Math.range(this.get("height")-((this.get("height")/this.get("max")) * this.getValue()), lineSize/2, this.get("height")-lineSize/2);
    
            g.fillAll(this.get("bgColour"));
            
            //Draw value display
            g.setColour(this.get("itemColour"));
    
            if (this.getValue() > 8192) //Bend up
            {   
                g.fillRect([0, linePos, this.get("width"), this.get("height")/2 - linePos]);
            }
            else if (this.getValue() < 8192) //Bend down
            {
                g.fillRect([0, this.get("height")/2, this.get("width"), linePos-this.get("height")/2]);
            }
        
            //Draw line
            g.setColour(this.get("itemColour2"));
            g.drawLine(0, this.get("width"), linePos, linePos, lineSize);    
        });
        
        
        //Mouse callbacks
        pnlPitch.setMouseCallback(function(event)
        {
            if (event.clicked)
            {
                // save the value from the mouse click
                this.data.mouseDownValue = this.getValue();
            }
            else
            {
                var newValue = this.getValue();
        
                if (event.drag)
                {
                    var distance  = (event.dragX - event.dragY) * 40; // Calculate the sensitivity value
                    newValue = Math.range(this.data.mouseDownValue + distance, this.get("min"), this.get("max"));
                }
        
                if (event.mouseUp)
                {
                    newValue = 8192;
                }
        
                if (newValue != this.getValue()) //The value has changed
                {
                    this.setValue(newValue);
                    this.repaint();
                    this.changed();
                    Synth.sendController(129, newValue);
                }
        
            }
        });
    };
};

ModPitchWheel.makePitchWheel("pnlPitch");
ModPitchWheel.makeModWheel("pnlMod");
pnlPitch.set("enabled", false);
