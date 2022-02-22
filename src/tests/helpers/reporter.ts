import { DisplayProcessor, SpecReporter, StacktraceOption } from "jasmine-spec-reporter"
import SuiteInfo = jasmine.SuiteInfo

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
  })
)
