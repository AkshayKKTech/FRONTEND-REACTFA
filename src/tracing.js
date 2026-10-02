import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'firstamerican-react-frontend',
  }),
});

// Export spans over HTTP to OpenTelemetry Collector
const collectorExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces', // Exposed endpoint of collector
});

provider.addSpanProcessor(new SimpleSpanProcessor(collectorExporter));
provider.register();

// Register automatic browser instrumentations
registerInstrumentations({
  instrumentations: [
    new DocumentLoadInstrumentation(),
    new UserInteractionInstrumentation({ eventNames: ['click', 'submit'] }),
    new FetchInstrumentation({
      // Propagate TraceContext headers (traceparent) to backend REST requests
      propagateTraceHeaderCorsUrls: [new RegExp('http://localhost:8080/.*')],
    }),
  ],
});
