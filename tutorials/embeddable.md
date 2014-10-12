<script src="../build/3Dmol-min.js"></script> 
A viewer can be automatically instantiated by simply assigning the class `viewer_3Dmoljs` to a `div`.
The viewer will be styled according to the containing `div`, so be sure to set a height and width.
The code below is all that is needed to create the displayed viewer.

```
{@lang xml} <script src="http://3Dmol.csb.pitt.edu/build/3Dmol-min.js"></script> </head>    
         <div style="height: 400px; width: 400px; position: relative;" class='viewer_3Dmoljs' data-pdb='2POR' data-backgroundcolor='0xffffff' data-style='stick'></div>       
```

<div style="height: 500px; width: 500px; position: relative;" class='viewer_3Dmoljs' data-pdb='2POR' data-backgroundcolor='0xffffff' data-style='stick'></div>       

The contents of the viewer can be set and manipulated through the use of `data-` tags, as shown above.  Supported tags include:
 - **data-pdb** The value describes a PDB ID to be loaded into the viewer.
 - **data-href** The value is a URL to a molecular data file.
 - **data-element** The value is the id of an HTML element on the current page that has molecular data embedded in it.
 - **data-datatype** The value is the file format (default pdb).  
 
 - **data-backgroundcolor** The background color (default black).
 - **data-select** The value is an {@link AtomSpec} selection specification.
 - **data-style** The value is a style specification.
 - **data-surface** A surface style specification.
 
 Multiple selections, styles, and surfaces can be provided by appending a suffix
 each tag.  For example.
 
 ```
{@lang xml} 
         <div style="height: 400px; width: 400px; position: relative;" class='viewer_3Dmoljs' data-pdb='1YCR' data-backgroundcolor='0xffffff' 
         data-select1='chain:A' data-style1='cartoon:color=spectrum' data-surface1='opacity:.7;color:white' data-select2='chain:B' data-style2='stick'></div>       
```

    <div style="height: 400px; width: 400px; position: relative;" class='viewer_3Dmoljs' data-pdb='1YCR' data-backgroundcolor='0xffffff' 
         data-select1='chain:A' data-style1='cartoon:color=spectrum' data-surface1='opacity:.7;color:white' data-select2='chain:B' data-style2='stick'></div>  
 
 Once created, the 3Dmol viewer can be accessed using the id of the container div in `$3Dmol.viewers`.




 