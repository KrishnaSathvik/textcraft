import { FileText, Target, Zap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ToolHelpItem, ToolHelpStep } from '@/types/tool';

interface ToolHelpAccordionProps {
  toolName: string;
  howToSteps: ToolHelpStep[];
  whyUseItems: ToolHelpItem[];
  keyFeatures: string[];
}

export const ToolHelpAccordion = ({
  toolName,
  howToSteps,
  whyUseItems,
  keyFeatures,
}: ToolHelpAccordionProps) => (
  <Accordion type="multiple" className="w-full border border-border rounded-lg divide-y divide-border">
    <AccordionItem value="how-to" className="border-0 px-3 sm:px-4">
      <AccordionTrigger className="text-left hover:no-underline py-3">
        <span className="flex items-center gap-2 font-medium text-sm sm:text-base">
          <FileText className="h-4 w-4 text-primary shrink-0" />
          How to use {toolName}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-3">
          {howToSteps.map((step, index) => (
            <div key={step.title} className="text-left md:text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2 md:mx-auto">
                <span className="text-primary font-semibold text-sm">{index + 1}</span>
              </div>
              <h3 className="font-medium mb-1 text-sm">{step.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="why-use" className="border-0 px-3 sm:px-4">
      <AccordionTrigger className="text-left hover:no-underline py-3">
        <span className="flex items-center gap-2 font-medium text-sm sm:text-base">
          <Target className="h-4 w-4 text-primary shrink-0" />
          Why use {toolName}?
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2.5 pb-3">
          {whyUseItems.map((item) => (
            <li key={item.title}>
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="key-features" className="border-0 px-3 sm:px-4">
      <AccordionTrigger className="text-left hover:no-underline py-3">
        <span className="flex items-center gap-2 font-medium text-sm sm:text-base">
          <Zap className="h-4 w-4 text-primary shrink-0" />
          Key features
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-1.5 pb-3">
          {keyFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
