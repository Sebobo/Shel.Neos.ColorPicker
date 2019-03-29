import manifest from '@neos-project/neos-ui-extensibility';

import ColorPickerEditor from './ColorPickerEditor';

manifest('Shel.Neos.ColorPicker:ColorPickerEditor', {}, globalRegistry => {
    const editorsRegistry = globalRegistry.get('inspector').get('editors');

    editorsRegistry.set('Shel.Neos.ColorPicker/ColorPickerEditor', {
        component: ColorPickerEditor
    });
});
