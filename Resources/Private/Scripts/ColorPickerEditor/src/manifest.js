import manifest from '@neos-project/neos-ui-extensibility';

import makeColorPickerEditor from './ColorPickerEditor.tsx';

manifest('Shel.Neos.ColorPicker:ColorPickerEditor', {}, (globalRegistry, { frontendConfiguration }) => {
    const editorsRegistry = globalRegistry.get('inspector').get('editors');
    const colorPickerConfig = frontendConfiguration['Shel.Neos:ColorPickerEditor'];

    editorsRegistry.set('Shel.Neos.ColorPicker/ColorPickerEditor', {
        component: makeColorPickerEditor(colorPickerConfig),
    });
});
