<?php

/* {# inline_template_start #}{#

Description text for the Fapi Example.

#}

{{ attach_library('core/drupal.dialog.ajax') }}
{% set simple_form = path('at_demo.simple_form') %}
{% trans %}
<p>Form example to demonstrate accessibility tools using the Drupal Form API</p>
<p><a href={{ simple_form }}>Simple form</a></p>
{% endtrans %}
 */
class __TwigTemplate_fd42255a18a2d986394c03974b217ebd59154b596cae622575c81a6006a33b0e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $tags = array("set" => 8, "trans" => 9);
        $filters = array();
        $functions = array("attach_library" => 7, "path" => 8);

        try {
            $this->env->getExtension('Twig_Extension_Sandbox')->checkSecurity(
                array('set', 'trans'),
                array(),
                array('attach_library', 'path')
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 6
        echo "
";
        // line 7
        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("core/drupal.dialog.ajax"), "html", null, true));
        echo "
";
        // line 8
        $context["simple_form"] = $this->env->getExtension('Drupal\Core\Template\TwigExtension')->getPath("at_demo.simple_form");
        // line 9
        echo t("<p>Form example to demonstrate accessibility tools using the Drupal Form API</p>
<p><a href=@simple_form>Simple form</a></p>", array("@simple_form" =>         // line 11
(isset($context["simple_form"]) ? $context["simple_form"] : null), ));
    }

    public function getTemplateName()
    {
        return "{# inline_template_start #}{#

Description text for the Fapi Example.

#}

{{ attach_library('core/drupal.dialog.ajax') }}
{% set simple_form = path('at_demo.simple_form') %}
{% trans %}
<p>Form example to demonstrate accessibility tools using the Drupal Form API</p>
<p><a href={{ simple_form }}>Simple form</a></p>
{% endtrans %}
";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  66 => 11,  64 => 9,  62 => 8,  58 => 7,  55 => 6,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "{# inline_template_start #}{#

Description text for the Fapi Example.

#}

{{ attach_library('core/drupal.dialog.ajax') }}
{% set simple_form = path('at_demo.simple_form') %}
{% trans %}
<p>Form example to demonstrate accessibility tools using the Drupal Form API</p>
<p><a href={{ simple_form }}>Simple form</a></p>
{% endtrans %}
", "");
    }
}
