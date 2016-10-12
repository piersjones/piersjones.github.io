My Brain in Canvas and CSS3, Now with Laserbeams.
=======================================

*Inspired by* [Your Brain on CSS](http://acko.net/blog/this-is-your-brain-on-css/)


About
-----

A year ago I participated in a psychology experiment at UCSB that required me to be in an MRI machine for 2 hours. A silly thing to volunteer, unless you could get a 3D model of your head out of it.

If you click anywhere, laserbeams shoot out of my eyeballs and my head convulses. Hold a click down long enough and a silly smoke animation fires.

Drag the slider to hide/show cross sections of my head.

How
---

I used the free Mac software [Osirix](http://www.osirix-viewer.com/) to export the 3D DICOM format I was given by the lab into cross-section JPGs. I cannot overstate how amazing the free Osirix software is for visualization. Though primarily used for medical applications, it has a lot of fun visual effects and filters to play with.

Each of these slices (120 in total, though this is variable) are joined into a sprite with the included sprite.py python script. Where I make two versions: grayscaled and colored. The grayscale is used to mask for the colored version to get the opacity right. This is done in canvas by setting the alpha channel from the grayscaled version onto the colored version.

Each slice is then rendered into its own canvas and offset in 3D space using CSS3 `translateZ()`.

The slices are wrapped in a `<div>` that is styled with CSS3 to create a 3D space.

The laserbeams are overlapping SVG lines with an animation set on the stroke-dasharray attribute animated. To get the positioning of the laserbeam emanating from the eyeball, I attach a hidden `<div>` on each eye and check for its 'offset()' positions.

