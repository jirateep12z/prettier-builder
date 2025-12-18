import { FrameworkIcon } from '@/components/framework-icons';
import { FrameworkSelector } from '@/components/framework-selector';
import { Header } from '@/components/header';
import { IgnorePatternsEditor } from '@/components/ignore-patterns-editor';
import { OutputPreview } from '@/components/output-preview';
import { PrettierConfigEditor } from '@/components/prettier-config-editor';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UseBuilder } from '@/hooks/use-builder';
import { MousePointerClick, RotateCcw } from 'lucide-react';

function App() {
  const {
    state,
    output_format,
    selected_framework_data,
    set_output_format,
    SelectFramework,
    UpdatePrettierConfig,
    ToggleIgnorePattern,
    AddCustomPattern,
    RemoveCustomPattern,
    AddCommonPatterns,
    ResetToFrameworkDefaults,
    GenerateOutput,
    GenerateInstallCommand,
    CopyToClipboard,
    DownloadFile
  } = UseBuilder();

  const output = GenerateOutput();

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container py-8">
        <div className="space-y-8">
          <FrameworkSelector
            selected_framework={state.selected_framework}
            OnSelect={SelectFramework}
          />
          {state.selected_framework && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    {selected_framework_data?.icon_id && (
                      <FrameworkIcon
                        icon_id={selected_framework_data.icon_id}
                        class_name="mr-2 inline-block h-5 w-5 align-[-2px]"
                      />
                    )}
                    {selected_framework_data?.name} Configuration
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {selected_framework_data?.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={ResetToFrameworkDefaults}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset to Defaults
                </Button>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                  <PrettierConfigEditor
                    config={state.prettier_config}
                    OnUpdate={UpdatePrettierConfig}
                  />
                  <IgnorePatternsEditor
                    patterns={state.ignore_patterns}
                    custom_patterns={state.custom_patterns}
                    OnToggle={ToggleIgnorePattern}
                    OnAddCustom={AddCustomPattern}
                    OnRemoveCustom={RemoveCustomPattern}
                    OnAddCommonPatterns={AddCommonPatterns}
                  />
                </div>
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <OutputPreview
                    output={output}
                    output_format={output_format}
                    OnFormatChange={set_output_format}
                    OnCopy={CopyToClipboard}
                    OnDownload={DownloadFile}
                    GenerateInstallCommand={GenerateInstallCommand}
                  />
                </div>
              </div>
            </>
          )}
          {!state.selected_framework && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MousePointerClick className="text-muted-foreground h-16 w-16" />
              <h3 className="mt-4 text-xl font-semibold">
                เลือก Framework เพื่อเริ่มต้น
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                เลือก framework ที่คุณใช้งานด้านบน เพื่อสร้างไฟล์ .prettierrc
                และ .prettierignore ที่เหมาะสม
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="text-muted-foreground container text-center text-sm">
          <p>Built with ❤️ using React, TailwindCSS, and shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
