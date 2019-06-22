import manifest from '@neos-project/neos-ui-extensibility';

import ColorPickerEditor from './ColorPickerEditor';

manifest('Shel.Neos.ColorPicker:ColorPickerEditor', {}, (globalRegistry, {frontendConfiguration}) => {
    const editorsRegistry = globalRegistry.get('inspector').get('editors');
    const colorPickerConfig = frontendConfiguration['Shel.Neos:ColorPickerEditor'];

    editorsRegistry.set('Shel.Neos.ColorPicker/ColorPickerEditor', {
        component: class extends ColorPickerEditor {
            getConfig() {
                return colorPickerConfig;
            }
        }
    });
});
