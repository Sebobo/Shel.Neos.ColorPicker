# Colorpicker editor for Neos CMS

## Introduction

This package provides a color picker editor which can be used
in Neos CMS with the Neos.UI 2+.

This editor is based on the example in https://github.com/neos/neos-ui-extensibility-examples but 
has somme modifications in regards to styling, supports the alpha channel and has a reset button to
unset a value.

## Example           

See it in [action](https://vimeo.com/327331115).

![Colorpicker in Neos CMS sidebar](Documentation/ColorPickerExample.jpg)  

## Installation

Run this in your site package

    composer require --no-update shel/neos-colorpicker
    
Then run `composer update` in your project directory.

## How to use

Add a property of type string and set the editor like in this example:

    'My.Site:Content.Text':
      superTypes:
        'Neos.Neos:Content': true
      ui:
        label: 'My text content'
      properties:    
        textColor:
          type: string
          ui:
            label: 'Text color'
            reloadIfChanged: true
            inspector:
              group: 'text'
              editor: 'Shel.Neos.ColorPicker/ColorPickerEditor'     

## Contributions

Contributions are very welcome! 

Please create detailed issues and PRs.
