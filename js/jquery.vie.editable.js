/*
 * jQuery VIE editable
 *
 */
if (typeof VIE === 'undefined') {
    VIE = {};
}

VIE.Editable = {
    options: {
        editor: false
    },
    
    editorInstance: null,
    editors: {
        wymeditor: {
            enableEditable: function(o) {
                var containerInstance = VIE.ContainerManager.getInstanceForContainer(jQuery(o.element));
                if (typeof containerInstance.editables === 'undefined') {
                    containerInstance.editables = {};
                }
                VIE.ContainerManager.findContainerProperties(o.element, false).each(function() {
                    var containerProperty = jQuery(this);
                    var propertyName = containerProperty.attr('property');
                    
                    if (containerProperty.is('div')) {
                        containerProperty.wymeditor(jQuery.extend(o.options, {
                            html: containerProperty.html(),
                            logoHtml: '',
                            postInit: function(wym) {
                                containerInstance.editables[propertyName] = o;
                                o.editorInstance = wym;
                                wym.vieContainerInstance = containerInstance;
                                jQuery(wym._doc).bind('keyup', function () {
                                    //isModified?
                                });
                            }
                        }));
                    } else {
                        jQuery(containerProperty)
                            .replaceWith(
                                jQuery('<input></input>')
                                    .attr('type', 'text')
                                    .val(jQuery(this).text())
                                    .css('margin-bottom', '1em')
                            );
                    }
                });
            },

            disableEditable: function(o) {},
            isModified: function() {},
            getContents: function() {}
        },
        aloha: {
            enableEditable: function(o) {
                var containerInstance = VIE.ContainerManager.getInstanceForContainer(jQuery(o.element));
                if (typeof containerInstance.editables === 'undefined') {
                    containerInstance.editables = {};
                }
                VIE.ContainerManager.findContainerProperties(o.element, false).each(function() {
                    var containerProperty = jQuery(this);
                    var propertyName = containerProperty.attr('property');

                    if (containerInstance.get(propertyName) instanceof Array) {
                        // For now we don't deal with multivalued properties in Aloha
                        return true;
                    }

                    containerInstance.editables[propertyName] = new GENTICS.Aloha.Editable(containerProperty);
                    containerInstance.editables[propertyName].vieContainerInstance = containerInstance;
                });
            },
            disableEditable: function() {},
            isModified: function() {},
            getContents: function() {}
        }
    },

    _create: function() {
        this.editors[this.options.editor].enableEditable(this);
    },

    _destroy: function() {
        this.editors[this.options.editor].disableEditable(this);
    },

    _enable: function() {
        this.editors[this.options.editor].enableEditable(this);
    },

    _disable: function() {
        this.editors[this.options.editor].disableEditable(this);
    },

};

$.widget('vie.vieEditable', VIE.Editable);
