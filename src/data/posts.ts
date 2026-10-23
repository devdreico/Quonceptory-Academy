import type { Post } from './types';

export const posts: Post[] = [
  {
    id: 'b-01',
    slug: 'disenar-un-agente-que-no-se-pierda',
    title: { es: 'Cómo diseñar un agente que no se pierda en la mitad de la tarea', en: 'How to design an agent that does not get lost halfway through' },
    excerpt: {
      es: 'Los agentes fallan por deriva, no por falta de inteligencia. Un plan por etapas con artefactos observables evita que el modelo improvise.',
      en: 'Agents fail from drift, not from lack of intelligence. A staged plan with observable artifacts stops the model improvising.',
    },
    body: [
      {
        es: 'Casi todos los agentes fallan de la misma manera: arrancan bien, ejecutan los dos primeros pasos con solvencia y a partir del tercero empiezan a improvisar. Repiten una acción que ya hicieron, olvidan una restricción que aparecía en la instrucción inicial o declaran el trabajo terminado cuando solo completaron la mitad. El problema rara vez es el modelo. Es el diseño de la tarea.',
        en: 'Almost every agent fails the same way: it starts well, handles the first two steps competently, and from the third step onwards it begins to improvise. It repeats an action it already took, forgets a constraint from the opening instruction, or declares the work done when only half is complete. The model is rarely the problem. The task design is.',
      },
      {
        es: 'La causa profunda es que se le pide a una entidad que razona en secuencias de texto algo que no tiene estado observable. Si la tarea no deja rastro intermedio verificable, el modelo solo puede confiar en su propia narración de lo que ha hecho, y esa narración se degrada con cada paso. Un agente que trabaja sobre un objeto externo — un archivo, una fila, un ticket — tiene un ancla; uno que trabaja solo con su memoria de conversación no.',
        en: 'The root cause is that we ask a text-reasoning entity to do something that has no observable state. If the task leaves no verifiable intermediate trace, the model can only trust its own narration of what it has done, and that narration degrades with every step. An agent working on an external object — a file, a row, a ticket — has an anchor; one working only on its conversation memory does not.',
      },
      {
        es: 'La solución que funciona en producción es descomponer la tarea en etapas cortas, cada una con un artefacto escrito y comprobable. No basta con decirle al agente que trabaje por fases: hay que exigir que la fase termine produciendo algo que otra pieza de código pueda leer y validar. Si la validación falla, el agente repite esa etapa, no la tarea entera.',
        en: 'The solution that works in production is to break the task into short stages, each producing a written, checkable artifact. Telling the agent to work in phases is not enough: each phase must end by producing something else in the code can read and validate. If validation fails, the agent repeats that stage, not the whole task.',
      },
      {
        es: 'Tomemos un caso real: la conciliación de facturas. Una sola instrucción de "cruza facturas, pedidos y pagos" produce agentes que se pierden cuando encuentran tres partidas parecidas. En cambio, si cada etapa escribe un registro — facturas parseadas, coincidencias candidatas, excepciones con motivo — el modelo siempre sabe en qué punto está y el supervisor humano puede inspeccionar la fila exacta donde la cosa se complicó.',
        en: 'Take a real case: invoice reconciliation. A single instruction to "match invoices, orders and payments" produces agents that get lost when three similar lines appear. But if every stage writes a record — parsed invoices, candidate matches, exceptions with reason — the model always knows where it is, and the human supervisor can inspect the exact row where things got complicated.',
      },
      {
        es: 'Las herramientas también tienen que devolver resultados con forma. Una función que devuelve un string libre obliga al modelo a interpretar; una que devuelve un objeto con estado, conteos y errores tipados le deja verificar. Cuanto menos tenga que adivinar el agente sobre el resultado de su propia acción, menos oportunidades tiene de construir una historia incorrecta sobre lo que ha ocurrido.',
        en: 'Tools also need to return shaped results. A function returning a free string forces the model to interpret; one returning an object with status, counts and typed errors lets it verify. The less the agent has to guess about the outcome of its own action, the fewer chances it has to build a false story about what happened.',
      },
      {
        es: 'El presupuesto es parte del diseño. Fija un máximo de pasos, de tokens y de tiempo real, y define de antemano qué pasa cuando se alcanza: degradar a revisión humana, devolver un resultado parcial marcado como incompleto o reintentar una sola etapa. Un agente sin límites no es más capaz; solo tarda más en fallar y gasta más en el camino.',
        en: 'Budget is part of the design. Set a maximum number of steps, tokens and wall-clock time, and define in advance what happens when they are hit: degrade to human review, return a partial result flagged as incomplete, or retry a single stage once. An agent without limits is not more capable; it just takes longer to fail and spends more on the way there.',
      },
      {
        es: 'Por último, evalúa el recorrido, no solo la respuesta final. Revisa trazas: ¿en qué paso apareció la primera desviación? ¿Qué herramienta devolvió un formato inesperado? ¿En qué momento el modelo dejó de citar fuentes? Un puñado de tareas doradas con inspección de trazas te dice más sobre la robustez de tu agente que cien respuestas finales puntuadas a ojo.',
        en: 'Finally, evaluate the path, not only the final answer. Inspect traces: at which step did the first deviation appear? Which tool returned an unexpected format? When did the model stop citing sources? A handful of golden tasks with trace inspection tells you more about agent robustness than a hundred final answers eyeballed one by one.',
      },
      {
        es: 'Un agente fiable es, en el fondo, aburrido por diseño: etapas cortas, artefactos verificables, herramientas tipadas y límites explícitos. La inteligencia del modelo sigue importando, pero llega después. Primero se diseña el terreno donde la inteligencia puede operar sin perderse.',
        en: 'A reliable agent is, at heart, boring by design: short stages, verifiable artifacts, typed tools and explicit limits. Model intelligence still matters, but it comes second. First you design the terrain where intelligence can operate without getting lost.',
      },
    ],
    category: 'Agentes',
    date: '2026-09-17',
    readMinutes: 10,
    author: 'Laura Mendoza',
    featured: true,
  },
  {
    id: 'b-02',
    slug: 'subagentes-cuando-delegar-y-cuando-no',
    title: { es: 'Subagentes: cuándo delegar y cuándo no', en: 'Subagents: when to delegate and when not to' },
    excerpt: {
      es: 'Delegar en subagentes multiplica alcance y también coste. Tres criterios concretos para decidir dónde corta la jerarquía.',
      en: 'Delegating to subagents multiplies reach and cost too. Three concrete criteria for deciding where the hierarchy stops.',
    },
    body: [
      {
        es: 'La moda de los subagentes promete una idea seductora: un agente principal que reparte trabajo entre especialistas, como un director con su equipo. En la práctica, añadir una capa de delegación sin criterio produce sistemas más caros, más lentos y más difíciles de depurar. Tres agentes que se leen los unos a los otros comparten contexto por texto, y el texto cuesta tokens.',
        en: 'The subagent trend sells a seductive idea: a lead agent that distributes work among specialists, like a manager with a team. In practice, adding a delegation layer without criteria produces systems that are more expensive, slower and harder to debug. Three agents that read each other share context as text, and text costs tokens.',
      },
      {
        es: 'El primer criterio es la independencia real de las subtareas. Si las partes de la tarea se pueden ejecutar en paralelo sin compartir hallazgos intermedios — analizar tres documentos, ejecutar cuatro consultas, revisar cinco módulos de código — la delegación aporta. Si cada subtarea necesita lo que la anterior descubrió, no tienes subagentes: tienes una cadena disfrazada.',
        en: 'The first criterion is real independence between subtasks. If task parts can run in parallel without sharing intermediate findings — analyze three documents, run four queries, review five code modules — delegation pays off. If each subtask needs what the previous one discovered, you do not have subagents: you have a chain in disguise.',
      },
      {
        es: 'El segundo criterio es el aislamiento de riesgo. Un subagente que ejecuta código, envía correos o modifica un registro debe estar confinado con permisos mínimos y una ventana de acciones destructivas pequeña. Ahí la jerarquía es útil: el agente principal no tiene esos permigos, así que el daño posible queda limitado a un rol estrecho y revocable.',
        en: 'The second criterion is risk isolation. A subagent that runs code, sends email or mutates a record should be confined to minimal permissions and a narrow destructive-action window. Hierarchy helps here: the lead agent does not hold those permissions, so potential damage is limited to a narrow, revocable role.',
      },
      {
        es: 'El tercer criterio es el coste de la coordinación. Cada delegación implica reescribir el objetivo, el estado y las restricciones en el mensaje del hijo. Si esa reescritura supera el 20 % de los tokens de la tarea, conviene simplificar la arquitectura antes que repartir más. La regla práctica: si el prompt del subagente es más largo que su resultado esperado, algo va mal en el corte.',
        en: 'The third criterion is coordination cost. Every delegation means restating the goal, state and constraints in the child message. If that restatement exceeds 20 % of the task tokens, simplify the architecture before splitting further. Practical rule: if the subagent prompt is longer than its expected output, the split is wrong.',
      },
      {
        es: 'Hay un patrón híbrido que funciona bien en la mayoría de proyectos: un único agente con herramientas bien tipadas para la línea principal de trabajo, y subagentes reservados para dos casos — exploración paralela de lectura y ejecución de acciones de riesgo. El resto de la especialización se resuelve con mejores instrucciones, no con más procesos.',
        en: 'A hybrid pattern works well on most projects: a single agent with well-typed tools for the main line of work, and subagents reserved for two cases — parallel read-only exploration and risky action execution. Everything else is solved with better instructions, not more processes.',
      },
      {
        es: 'Mide antes de decidir. Compara la misma tarea con una y con tres capas: tasa de éxito, tokens consumidos, latencia y número de reintentos. En nuestras revisiones, la delegación solo gana cuando las subtareas son paralelas y de lectura; en cadenas secuenciales, el agente único con estado explícito casi siempre rinde igual o mejor.',
        en: 'Measure before deciding. Run the same task with one layer and with three: success rate, tokens consumed, latency and retry count. In our reviews, delegation only wins when subtasks are parallel and read-only; on sequential chains a single agent with explicit state almost always performs as well or better.',
      },
      {
        es: 'La jerarquía de agentes es una herramienta de ingeniería, no un símbolo de sofisticación. Úsala cuando aísle riesgo o paralelice lectura; evítala cuando solo añada narración entre medio. El mejor sistema es el más pequeño que resuelve la tarea de forma verificable.',
        en: 'Agent hierarchy is an engineering tool, not a badge of sophistication. Use it to isolate risk or parallelize reading; avoid it when it only adds narration in between. The best system is the smallest one that solves the task verifiably.',
      },
    ],
    category: 'Agentes',
    date: '2026-08-26',
    readMinutes: 8,
    author: 'Óscar Delgado',
  },
  {
    id: 'b-03',
    slug: 'errores-de-produccion-en-agentes',
    title: { es: 'Errores de producción en agentes: lecciones de doce despliegues', en: 'Production errors in agents: lessons from twelve deployments' },
    excerpt: {
      es: 'Doce despliegues, un patrón claro: los fallos no vienen del modelo, sino de datos de entrada, límites ausentes y tool calls mal tipadas.',
      en: 'Twelve deployments, one clear pattern: failures come from input data, missing limits and badly typed tool calls, not the model.',
    },
    body: [
      {
        es: 'Revisamos doce despliegues de agentes en los últimos dieciocho meses — soporte, finanzas, logística, salud — y catalogamos cada incidente que llegó a un usuario real. El resultado incómodo: en solo dos casos la causa raíz tenía que ver con el modelo. El resto fueron problemas de ingeniería que habrían roto cualquier sistema, con o sin IA.',
        en: 'We reviewed twelve agent deployments over the last eighteen months — support, finance, logistics, health — and cataloged every incident that reached a real user. The uncomfortable result: in only two cases did the root cause involve the model. The rest were engineering problems that would have broken any system, AI or not.',
      },
      {
        es: 'El error más frecuente fue alimentar al agente con datos de entrada sucios. Textos con codificación rota, campos vacíos interpretados como cero, correos con adjuntos que el parser no soportaba. El modelo respondía con total confianza sobre información degradada. La defensa no es un mejor prompt: es validar y normalizar la entrada antes de que el agente la vea.',
        en: 'The most common error was feeding the agent dirty input data. Texts with broken encoding, empty fields read as zero, emails with attachments the parser did not support. The model answered with total confidence on degraded information. The defense is not a better prompt: it is validating and normalizing input before the agent sees it.',
      },
      {
        es: 'El segundo lugar lo compartieron dos problemas: herramientas sin límites y herramientas sin errores claros. Un endpoint de búsqueda sin paginación devolvía listas interminables que desbordaban el contexto; una API de escritura que devolvía 200 aunque nada se hubiera guardado hacía que el agente declarara éxito falso. Toda tool call necesita un contrato: límites de tamaño, error tipado y confirmación de efecto.',
        en: 'Second place went to two problems: tools without limits and tools without clear errors. An unpaged search endpoint returned endless lists that overflowed context; a write API returning 200 even when nothing was saved made the agent report false success. Every tool call needs a contract: size limits, typed errors and effect confirmation.',
      },
      {
        es: 'También vimos el patrón contrario: reintentos infinitos. Un fallo transitorio de red provocaba que el agente repitiera la misma llamada treinta veces, consumiendo presupuesto sin mover la tarea. El reintento debe ser de la infraestructura, acotado y con espera creciente; el agente solo debe reintentar cuando el error indica una acción corregible, no un fallo del sistema.',
        en: 'We also saw the opposite pattern: infinite retries. A transient network failure made the agent repeat the same call thirty times, burning budget without advancing the task. Retries belong to infrastructure, bounded with backoff; the agent should only retry when the error indicates a correctable action rather than a system failure.',
      },
      {
        es: 'Los incidentes más caros fueron los de permisos. Un agente con acceso de lectura-escritura a un CRM borró campos que nadie detectó durante nueve días. Ningún modelo del mundo compensa un diseño de permisos vago. Princípio mínimo: el agente solo recibe el alcance exacto de su tarea, y toda acción destructiva exige confirmación humana al menos en el primer mes de operación.',
        en: 'The costliest incidents were permission ones. An agent with read-write CRM access deleted fields nobody noticed for nine days. No model in the world compensates for vague permission design. Minimum principle: the agent receives only the exact scope of its task, and every destructive action requires human confirmation at least during the first month of operation.',
      },
      {
        es: 'Otro hallazgo: la deriva de contexto en sesiones largas. Tras cuarenta o cincuenta intercambios, los agentes empezaban a citar instrucciones que ya no aplicaban o a mezclar datos de dos casos distintos. La solución fue reiniciar la sesión con un resumen estructurado del estado, en lugar de dejar correr la conversación indefinidamente.',
        en: 'Another finding: context drift on long sessions. After forty or fifty exchanges, agents began citing instructions that no longer applied or mixing data from two different cases. The fix was restarting the session with a structured summary of state instead of letting the conversation run on indefinitely.',
      },
      {
        es: 'Por último, casi nadie alertaba sobre coste. El incidente que más enseñó fue una factura que se multiplicó por nueve en un fin de semana: un bucle sin presupuesto llamando a un modelo caro en cada iteración. Un presupuesto de tokens por tarea y una alerta diaria evitan más sustos que cualquier tablero de calidad.',
        en: 'Finally, almost nobody alerted on cost. The most instructive incident was a bill that multiplied by nine over one weekend: a budgetless loop calling an expensive model on every iteration. A per-task token budget and a daily alert prevent more scares than any quality dashboard.',
      },
      {
        es: 'Si tu sistema de agentes va a producción, dedica más ingeniería a entradas, contratos de herramientas, permisos y presupuestos que a refinar prompts. El modelo ya es bastante bueno; lo que rompe agentes son las decisiones que tomamos a su alrededor.',
        en: 'If your agent system is going to production, spend more engineering on inputs, tool contracts, permissions and budgets than on prompt polishing. The model is already good enough; what breaks agents are the decisions we make around it.',
      },
    ],
    category: 'Agentes',
    date: '2026-07-14',
    readMinutes: 10,
    author: 'Alejandro Vidal',
  },
  {
    id: 'b-04',
    slug: 'humanos-en-el-bucle-interruptor-de-seguridad',
    title: { es: 'Humanos en el bucle: el interruptor de seguridad de tus agentes', en: 'Humans in the loop: your agent safety switch' },
    excerpt: {
      es: 'La supervisión humana no es un freno al escalar: es el mecanismo que hace aceptable el escalar. Cómo diseñar los puntos de aprobación.',
      en: 'Human oversight is not a brake on scale: it is what makes scale acceptable. How to design the approval points.',
    },
    body: [
      {
        es: 'Casi toda organización que despliega su primer agente llega al mismo dilema: si cada acción pasa por una persona, el ahorro se evapora; si ninguna pasa, el riesgo se dispara. La respuesta no está en elegir un extremo, sino en decidir con precisión qué acciones merecen revisión y cuáles no.',
        en: 'Almost every organization deploying its first agent hits the same dilemma: if every action goes through a person, the savings evaporate; if none do, risk explodes. The answer is not picking an extreme, but deciding precisely which actions deserve review and which do not.',
      },
      {
        es: 'El primer paso es clasificar acciones por reversibilidad. Corregir una etiqueta en una base de datos es reversible; enviar un correo a un cliente, parcialmente; firmar, pagar o publicar, casi nunca. Cuanto menos reversible es la acción, más cerca debe estar el punto de revisión. Esta clasificación simple resuelve el 80 % de los casos sin tener que puntuar riesgos abstractos.',
        en: 'The first step is classifying actions by reversibility. Correcting a label in a database is reversible; sending a customer email, partially; signing, paying or publishing, almost never. The less reversible the action, the closer the review point must sit. This simple classification resolves 80 % of cases without scoring abstract risks.',
      },
      {
        es: 'El segundo paso es diseñar la revisión para que sea rápida. Pedir a un humano que lea el razonamiento completo del agente es ilusorio en volumen. Funciona mejor un paquete compacto: acción propuesta, evidencia en dos o tres enlaces, confianza del modelo y una alternativa de "dejar pasar". Si la revisión no cabe en 30 segundos, el equipo la acabará saltando.',
        en: 'The second step is designing review to be fast. Asking a human to read the full agent reasoning is unworkable at volume. What works is a compact package: proposed action, evidence in two or three links, model confidence and a "let it pass" option. If review does not fit in 30 seconds, the team will eventually skip it.',
      },
      {
        es: 'El tercer paso es medir la tasa de aceptación como indicador de salud. Si el equipo aprueba el 99,8 % de las propuestas, o el agente es extraordinariamente bueno, o la revisión se ha vuelto decorativa. Ambos extremos exigen atención: uno dice que puedes ampliar autonomía, el otro que has perdido el control sin darte cuenta.',
        en: 'The third step is measuring acceptance rate as a health indicator. If the team approves 99.8 % of proposals, either the agent is extraordinarily good or review has become decorative. Both extremes deserve attention: one says you can widen autonomy, the other says you quietly lost control.',
      },
      {
        es: 'Conviene programar la retirada de supervisión, no improvisarla. Fija umbrales explícitos: tras mil acciones sin incidentes y menos del 1 % de correcciones en una categoría, esa categoría baja de "revisar todo" a "revisar una muestra". La autonomía se gana con datos, y el camino inverso — volver a revisar más — debe ser igual de fácil de activar.',
        en: 'Schedule the removal of oversight rather than improvising it. Set explicit thresholds: after a thousand incident-free actions and under 1 % corrections in a category, that category drops from "review everything" to "sample review". Autonomy is earned with data, and the reverse path — tightening review again — must be just as easy to trigger.',
      },
      {
        es: 'No olvides el caso inverso: el humano que bloquea por defecto. En varios despliegues el equipo rechazaba propuestas correctas por desconfianza inicial, y el agente aprendió a ser conservador. Abrir una sesión de calibración de dos semanas, donde se discuten los rechazos uno a uno, alinea expectativas mucho mejor que cualquier documento de políticas.',
        en: 'Do not forget the reverse case: the human who blocks by default. In several deployments teams rejected correct proposals out of initial distrust, and the agent learned to be conservative. Running a two-week calibration session where rejections are discussed one by one aligns expectations far better than any policy document.',
      },
      {
        es: 'La supervisión humana bien diseñada es lo que permite escalar sin drama. No se trata de frenar a la máquina, sino de construir el freno de mano que la organización necesita para confiar en ella el tiempo suficiente como para dejar de mirar.',
        en: 'Well-designed human oversight is what lets you scale without drama. It is not about braking the machine, but building the handbrake the organization needs to trust it long enough to stop watching so closely.',
      },
    ],
    category: 'Agentes',
    date: '2026-05-21',
    readMinutes: 7,
    author: 'Sofía Herrera',
  },
  {
    id: 'b-05',
    slug: 'del-chatbot-al-agente-cinco-saltos',
    title: { es: 'Del chatbot al agente: cinco saltos que sí importan', en: 'From chatbot to agent: the five jumps that matter' },
    excerpt: {
      es: 'Un chatbot responde; un agente actúa. Entre ambos hay cinco decisiones de arquitectura, no una mejora gradual del prompt.',
      en: 'A chatbot answers; an agent acts. Between them sit five architectural decisions, not a gradual prompt improvement.',
    },
    body: [
      {
        es: 'Muchos equipos creen que pasar de chatbot a agente es una evolución continua: mismo sistema, prompts un poco mejores, algún modelo más reciente. En realidad son dos arquitecturas distintas con contratos distintos. Confundirlas explica por qué tantos "chatbots avanzados" se estrellan cuando se les pide hacer algo.',
        en: 'Many teams believe moving from chatbot to agent is continuous evolution: same system, slightly better prompts, a newer model. They are actually two different architectures with different contracts. That confusion explains why so many "advanced chatbots" crash the moment you ask them to do something.',
      },
      {
        es: 'Primer salto: de respuesta a efecto. El chatbot optimiza la calidad de su texto; el agente optimiza el estado del mundo tras su acción. Eso obliga a definir qué significa éxito de forma verificable por código, no por lectura humana. Si tu métrica sigue siendo "la respuesta parece buena", aún tienes un chatbot.',
        en: 'First jump: from answer to effect. A chatbot optimizes the quality of its text; an agent optimizes the state of the world after acting. That forces you to define success in a way code can verify, not a human can read. If your metric is still "the answer looks good", you still have a chatbot.',
      },
      {
        es: 'Segundo salto: herramientas con contrato. Un chatbot con una función de búsqueda sigue siendo un chatbot. La diferencia aparece cuando el sistema elige entre varias acciones, maneja errores tipados y encadena resultados. La calidad de tus tool definitions pesa más que la calidad de tu system prompt.',
        en: 'Second jump: tools with a contract. A chatbot with a search function is still a chatbot. The difference appears when the system chooses among several actions, handles typed errors and chains results. The quality of your tool definitions outweighs the quality of your system prompt.',
      },
      {
        es: 'Tercer salto: estado externo. La conversación deja de ser el lugar donde vive el trabajo. El agente escribe en archivos, tablas o tickets, y la conversación se convierte en una vista de ese estado. Sin estado externo no hay reanudación, ni auditoría, ni colaboración entre sesiones.',
        en: 'Third jump: external state. The conversation stops being where the work lives. The agent writes to files, tables or tickets, and the conversation becomes a view of that state. Without external state there is no resumption, no audit, no collaboration across sessions.',
      },
      {
        es: 'Cuarto salto: presupuesto y parada. Un chatbot responde y ya; un agente puede actuar durante minutos u horas, así que necesita límites de pasos, coste y tiempo, y una política clara de qué hacer cuando los alcanza. Sin esa política, la primera tarea mal planteada se convierte en un incendio de presupuesto.',
        en: 'Fourth jump: budget and stopping. A chatbot answers and stops; an agent may act for minutes or hours, so it needs step, cost and time limits plus a clear policy for when they are hit. Without that policy, the first badly framed task becomes a budget fire.',
      },
      {
        es: 'Quinto salto: evaluación por trazas. La evaluación de chatbots puntúa salidas; la de agentes puntúa decisiones. ¿Eligió la herramienta correcta? ¿Reconoció el error? ¿Pidió ayuda en el momento adecuado? Cambiar la suite de evaluación es, en la práctica, el momento en que el sistema empieza a comportarse como agente.',
        en: 'Fifth jump: trace-based evaluation. Chatbot evaluation scores outputs; agent evaluation scores decisions. Did it pick the right tool? Did it recognize failure? Did it ask for help at the right moment? Changing the evaluation suite is, in practice, the moment the system starts behaving like an agent.',
      },
      {
        es: 'Ninguno de estos saltos se consigue actualizando el modelo. Son decisiones de diseño que se toman en una semana y se mantienen durante años. Si vas a hacer el cambio, hazlo explícitamente: nombra las cinco, decide cada una y comunica al equipo qué sistema tienen delante.',
        en: 'None of these jumps comes from upgrading the model. They are design decisions you take in a week and maintain for years. If you are making the change, make it explicit: name the five, decide each one and tell your team which system they are dealing with.',
      },
    ],
    category: 'Agentes',
    date: '2025-11-18',
    readMinutes: 7,
    author: 'Daniel Rojas',
  },
  {
    id: 'b-06',
    slug: 'la-fase-que-todos-se-saltan-definir-el-punto-concreto',
    title: { es: 'La fase que todos se saltan: definir el punto concreto', en: 'The phase everyone skips: defining the concrete starting point' },
    excerpt: {
      es: 'El 70 % de los proyectos de IA fracasan por un problema mal planteado, no por el modelo. Cómo fijar el punto de partida antes de tocar código.',
      en: 'Seventy percent of AI projects fail on a badly framed problem, not the model. How to fix the starting point before touching code.',
    },
    body: [
      {
        es: 'Cuando un equipo dice "vamos a usar IA para esto", casi siempre empieza por la herramienta. Elige modelo, monta un cuaderno, prueba tres prompts y en dos semanas tiene una demo que impresiona. En dos meses descubre que la demo responde un problema que a nadie le importaba resolver con esa seriedad.',
        en: 'When a team says "let us use AI for this", it almost always starts with the tool. Pick a model, spin up a notebook, try three prompts, and in two weeks you have an impressive demo. In two months you discover the demo answered a problem nobody cared about solving that seriously.',
      },
      {
        es: 'La primera fase de nuestro método existe precisamente para evitar eso: fijar un punto concreto. No es una reunión de kickoff ni una lluvia de ideas. Es un ejercicio de precisión que responde cuatro preguntas con evidencia, no con opiniones.',
        en: 'The first phase of our method exists precisely to prevent this: fixing a concrete starting point. It is not a kickoff meeting or a brainstorm. It is a precision exercise answering four questions with evidence rather than opinion.',
      },
      {
        es: 'Pregunta uno: ¿quién sufre este problema y con qué frecuencia? Si no puedes nombrar un rol, un volumen y una frecuencia, el problema aún no existe. "Los comerciales pierden tiempo buscando información" no vale; "los comerciales dedican 6 horas semanales a encontrar el estado de cuenta" vale, porque es medible y atribuible.',
        en: 'Question one: who suffers this problem and how often? If you cannot name a role, a volume and a frequency, the problem does not exist yet. "Salespeople waste time finding information" does not count; "salespeople spend 6 hours a week finding account status" does, because it is measurable and attributable.',
      },
      {
        es: 'Pregunta dos: ¿qué dato lo demuestra? Un número sacado de un sistema real, una muestra observada o un registro de tickets. Si el dato no existe, el primer entregable del proyecto es instrumentarlo, no construir el piloto. Medir el antes es más barato que justificar el después.',
        en: 'Question two: what data proves it? A figure from a real system, an observed sample or a ticket log. If the data does not exist, the first deliverable of the project is instrumenting it, not building the pilot. Measuring the before is cheaper than justifying the after.',
      },
      {
        es: 'Pregunta tres: ¿qué decisión cambia si lo resolvemos? Aquí es donde muchos proyectos se desmoronan en silencio. No basta con ahorrar tiempo: hace falta un umbral concreto — menos de 48 horas de respuesta, menos de 5 % de error, más de 20 consultas resueltas sin escalado — que alguien con autoridad acepte como criterio de éxito.',
        en: 'Question three: what decision changes if we solve it? This is where many projects quietly fall apart. Saving time is not enough: you need a concrete threshold — under 48 hours response, under 5 % error, over 20 queries resolved without escalation — that someone with authority accepts as the success criterion.',
      },
      {
        es: 'Pregunta cuatro: ¿cuál es el límite explícito? Todo punto concreto tiene un perímetro: qué sistemas no se tocan, qué usuarios quedan fuera, qué tipo de error es inaceptable aunque el promedio sea bueno. Definir el límite al principio evita la discusión de la semana ocho, cuando el piloto ya consume presupuesto.',
        en: 'Question four: what is the explicit boundary? Every concrete starting point has a perimeter: which systems stay untouched, which users are excluded, which error type is unacceptable even if the average is fine. Defining the boundary upfront avoids the week-eight argument, when the pilot is already consuming budget.',
      },
      {
        es: 'El resultado de la fase es una página, no un documento de cien. Una sola hoja con las cuatro respuestas, las fuentes de cada dato y la firma de quien acepta el criterio de éxito. Esa página es lo que separa un proyecto de IA con destino de uno que acaba en una demo olvidada.',
        en: 'The output of this phase is one page, not a hundred-page document. A single sheet with the four answers, the source of each figure and the signature of whoever accepts the success criterion. That page is what separates an AI project with a destination from one that ends as a forgotten demo.',
      },
      {
        es: 'Dale quince días a esta fase antes de escribir una línea de código. Parece una inversión lenta y es exactamente lo contrario: es la única parte del proyecto donde cambiar de opinión sigue siendo gratis.',
        en: 'Give this phase fifteen days before writing a line of code. It looks like a slow investment and it is exactly the opposite: it is the only part of the project where changing your mind is still free.',
      },
    ],
    category: 'Metodología',
    date: '2026-10-08',
    readMinutes: 10,
    author: 'Camila Duarte',
    featured: true,
  },
  {
    id: 'b-07',
    slug: 'delegar-investigacion-preguntas-que-la-maquina-puede-atacar',
    title: { es: 'Delegar investigación: plantear una pregunta que una máquina pueda atacar', en: 'Delegating research: framing a question a machine can attack' },
    excerpt: {
      es: 'La investigación delegada funciona cuando la pregunta tiene forma de trabajo: fuentes, alcance y criterio de corte claros.',
      en: 'Delegated research works when the question has the shape of a job: clear sources, scope and stopping rule.',
    },
    body: [
      {
        es: 'Delegar investigación a un modelo no consiste en preguntar "qué sé sobre X". Consiste en convertir una incógnita abierta en una tarea con entregable, fuentes admitidas y criterio de parada. La diferencia entre ambos enfoques explica por qué unas veces ahorras semanas y otras obtienes un resumen genérico que ya conocías.',
        en: 'Delegating research to a model is not asking "what do you know about X". It is turning an open question into a task with a deliverable, admissible sources and a stopping rule. The difference between the two approaches explains why sometimes you save weeks and sometimes you get a generic summary you already knew.',
      },
      {
        es: 'Una buena pregunta de investigación tiene tres bordes. Borde de fuentes: qué material es admisible y cuál no — solo papers revisados, solo documentación oficial, solo informes de los últimos dos años. Borde de alcance: qué queda fuera explícitamente, aunque parezca relacionado. Borde de corte: cuándo dejar de buscar, en número de fuentes o de variantes descartadas.',
        en: 'A good research question has three edges. Source edge: what material is admissible and what is not — only peer-reviewed papers, only official docs, only reports from the last two years. Scope edge: what is explicitly out, even if related. Stopping edge: when to stop searching, expressed in sources or discarded variants.',
      },
      {
        es: 'Un ejemplo concreto. Pregunta mala: "investiga el estado del arte de RAG". Pregunta con forma de trabajo: "recoge doce publicaciones de los últimos dieciocho meses sobre evaluación de recuperación, excluye las que usan solo embeddings densos, y devuelve una tabla con métrica, dataset, tamaño de muestra y limitación declarada". La segunda es más larga y la primera es inútil.',
        en: 'A concrete example. Bad question: "research the state of the art in RAG". Question shaped like work: "collect twelve publications from the last eighteen months on retrieval evaluation, exclude those using only dense embeddings, and return a table with metric, dataset, sample size and declared limitation". The second is longer and the first is useless.',
      },
      {
        es: 'Conviene exigir trazabilidad desde el primer encargo. Cada afirmación que llegue al resumen debe enlazar su fuente, y cada fuente debe permitir comprobar si de verdad dice lo que se le atribuye. Cuando la trazabilidad es obligatoria, el modelo cita peor a mentir, y las lagunas aparecen como huecos en vez de discurso fluido.',
        en: 'Make traceability mandatory from the first assignment. Every claim reaching the summary must link its source, and every source must let you check it really says what is attributed to it. When traceability is required, models cite worse than they fabricate, and gaps show up as holes instead of fluent prose.',
      },
      {
        es: 'El criterio de parada es lo que separa un encargo de un bucle. Sin él, el modelo sigue generando variantes porque "quedan más ángulos por cubrir". Con él — doce fuentes, cinco hipótesis descartadas, dos documentos contradictorios identificados — la tarea termina y tú puedes evaluar el resultado contra un contrato cerrado.',
        en: 'The stopping rule is what separates an assignment from a loop. Without it, the model keeps generating variants because "more angles remain". With it — twelve sources, five hypotheses discarded, two contradicting documents identified — the task ends and you can judge the result against a closed contract.',
      },
      {
        es: 'Por último, reserva una segunda pasada de verificación humana sobre las citas clave. No hace falta releer todo: basta con abrir las tres fuentes que sostienen la conclusión principal. En nuestra experiencia, esa revisión de quince minutos detecta el 80 % de las atribuciones flojas antes de que lleguen a un documento de decisión.',
        en: 'Finally, keep a second human verification pass over the key citations. You do not need to reread everything: opening the three sources backing the main conclusion is enough. In our experience, that fifteen-minute review catches 80 % of weak attributions before they reach a decision document.',
      },
      {
        es: 'Delegar bien es escribir peajes de precisión en la pregunta, para que la máquina tenga algo concreto contra lo que empujar. La calidad del resultado rara vez supera la calidad del encargo.',
        en: 'Delegating well means writing precision tolls into the question, so the machine has something concrete to push against. Result quality rarely exceeds assignment quality.',
      },
    ],
    category: 'Metodología',
    date: '2025-12-09',
    readMinutes: 7,
    author: 'Isabel Kramer',
  },
  {
    id: 'b-08',
    slug: 'prototipos-medibles-define-el-numero-antes-de-codificar',
    title: { es: 'Prototipos medibles: define el número antes de escribir código', en: 'Measurable prototypes: set the number before writing code' },
    excerpt: {
      es: 'Si el criterio de éxito se define después del piloto, siempre gana la intuición de quien tiene más poder en la sala.',
      en: 'If the success criterion comes after the pilot, whoever holds the most power in the room always wins.',
    },
    body: [
      {
        es: 'Existe una trampa cómoda en todo proyecto de piloto: construir primero y acordar después qué significará el éxito. Parece pragmático, porque "ya veremos con datos". En la práctica, el número que aparece tarde casi siempre lo elige la persona con más autoridad, no la evidencia.',
        en: 'Every pilot project hides a comfortable trap: build first, agree later on what success means. It feels pragmatic — "we will see with data". In practice, the number that shows up late is almost always chosen by the person with most authority, not by the evidence.',
      },
      {
        es: 'La alternativa es fijar el número en la fase de definición, cuando el entusiasmo está alto pero el código aún no existe. Un prototipo medible empieza con una frase del tipo: "se considera válido si resuelve al menos el 70 % de los casos de una muestra de 200, con menos del 5 % de errores graves y sin subir el coste por caso por encima de un euro".',
        en: 'The alternative is setting the number during definition, when enthusiasm is high but no code exists yet. A measurable prototype starts with a sentence like: "it counts as valid if it handles at least 70 % of a 200-case sample, with under 5 % serious errors and no cost per case above one euro".',
      },
      {
        es: 'Cada componente de esa frase tiene función. El porcentaje fija el techo de lo aceptable; la muestra impide que decidas con diez casos favoritos; los errores graves distinguen entre fallar con estilo y fallar de verdad; y el coste impide que un piloto funcione solo mientras nadie mira la factura.',
        en: 'Each component of that sentence has a job. The percentage sets the acceptability ceiling; the sample stops you deciding on ten favorable cases; serious errors separate failing with style from failing outright; and cost stops a pilot working only while nobody watches the bill.',
      },
      {
        es: 'La muestra debe salir antes también. Si la eliges tú, tenderá a ser limpia; si elige el equipo de negocio, contendrá los casos incómodos que de verdad importan. Acuerda la fuente y la extracción con quien sufre el problema, y congélala. Que nadie pueda cambiar la muestra tras ver los resultados.',
        en: 'The sample must be fixed early too. If you pick it, it will trend clean; if the business team picks it, it will contain the uncomfortable cases that actually matter. Agree the source and extraction with whoever suffers the problem, then freeze it. Nobody gets to swap the sample after seeing results.',
      },
      {
        es: 'Conviene separar criterios de paso de indicadores de mejora. El criterio de paso es binario y se usa para decidir seguir o parar. Los indicadores de mejora — latencia, satisfacción, tasa de escalado — se miran durante el piloto para corregir el rumbo. Mezclarlos produce la discusión eterna donde siempre hay un número que apoya cada posición.',
        en: 'Separate go/no-go criteria from improvement indicators. The go/no-go criterion is binary and decides whether to continue or stop. Improvement indicators — latency, satisfaction, escalation rate — are watched during the pilot to steer. Mixing them produces the endless argument where some number always backs each position.',
      },
      {
        es: 'Registra también el umbral de fracaso, el que obliga a detenerse. Sin él, un piloto que se queda a tres puntos del objetivo se convierte en "necesitamos otra iteración" de forma automática. Decidir el castigo antes del experimento es lo que permite que el experimento sea honesto.',
        en: 'Also record the failure threshold, the one that forces a stop. Without it, a pilot landing three points short becomes "we need another iteration" automatically. Deciding the penalty before the experiment is what keeps the experiment honest.',
      },
      {
        es: 'Por último, comunica el número en el documento de arranque, no en el informe final. Que todo el equipo, el patrocinador y quien revisará el resultado sepan desde el minuto uno qué cifra decide. Es incómodo durante un día; es salvador durante seis meses.',
        en: 'Finally, communicate the number in the kickoff document, not the final report. Let the whole team, the sponsor and whoever will review the result know from minute one which figure decides. It is uncomfortable for one day; it saves six months.',
      },
      {
        es: 'Un prototipo sin número es una demo con fecha de caducidad. Un prototipo con número es una decisión esperando evidencia. Empieza siempre por la segunda frase.',
        en: 'A prototype without a number is a demo with an expiry date. A prototype with a number is a decision awaiting evidence. Always start with the second sentence.',
      },
    ],
    category: 'Metodología',
    date: '2025-11-04',
    readMinutes: 7,
    author: 'Héctor Salas',
  },
  {
    id: 'b-09',
    slug: 'amplificar-de-un-piloto-a-un-proceso-de-equipo',
    title: { es: 'Amplificar: de un piloto acomodado a un proceso de equipo', en: 'Amplifying: from a comfortable pilot to a team process' },
    excerpt: {
      es: 'Un piloto que funciona y nadie adopta es un gasto elegante. La cuarta fase convierte la demo en rutina medible.',
      en: 'A working pilot nobody adopts is an elegant expense. Phase four turns the demo into a measurable routine.',
    },
    body: [
      {
        es: 'El patrón más caro del mundo de la IA no es el piloto que falla: es el piloto que funciona y se queda ahí. Cumple sus métricas, recibe aplausos en la demo y seis meses después sigue usándolo la misma persona que lo construyó, mientras la organización vuelve a sus viejos hábitos.',
        en: 'The most expensive pattern in AI is not the failing pilot: it is the working pilot that stays put. It hits its metrics, takes applause in the demo, and six months later the same person who built it is still the only user while the organization returns to old habits.',
      },
      {
        es: 'La cuarta fase de nuestro método existe para evitar eso: amplificar. No significa "hacerlo más grande" a ciegas, sino convertir un resultado aislado en proceso con dueño, plantilla y métrica de adopción. Tres piezas tienen que estar antes de escalar.',
        en: 'The fourth phase of our method exists to prevent exactly that: amplification. It does not mean blindly making it bigger, but turning an isolated result into a process with an owner, a template and an adoption metric. Three pieces must be in place before scaling.',
      },
      {
        es: 'Primera pieza: el dueño. Alguien fuera del equipo piloto debe asumir la operación diaria del resultado — el turno de revisión, la respuesta cuando el modelo se equivoca, la petición de cambios. Sin dueño, escalar solo reparte el riesgo entre más personas sin repartir la responsabilidad.',
        en: 'First piece: the owner. Someone outside the pilot team must take over daily operation of the result — the review shift, the response when the model is wrong, the change requests. Without an owner, scaling only spreads risk across more people without spreading accountability.',
      },
      {
        es: 'Segunda pieza: la plantilla. El trabajo que el piloto hace a mano tiene que convertirse en algo que otro equipo pueda copiar: el prompt con su contexto versionado, la lista de comprobación de entrada, el formato de salida esperado, el registro de excepciones. Si documentar eso cuesta tres semanas, el piloto nunca saldrá del equipo original.',
        en: 'Second piece: the template. What the pilot does by hand must become something another team can copy: the versioned prompt with its context, the input checklist, the expected output format, the exception log. If documenting that takes three weeks, the pilot never leaves the original team.',
      },
      {
        es: 'Tercera pieza: métrica de adopción. No basta con medir calidad del modelo; hay que medir cuántas personas reales lo usan, con qué frecuencia y cuántas veces lo abandonan a mitad. Un sistema con 95 % de acierto y un 4 % de uso semanal es un fracaso operativo con un informe excelente.',
        en: 'Third piece: an adoption metric. Measuring model quality is not enough; you must measure how many real people use it, how often, and how often they abandon it midway. A system with 95 % accuracy and 4 % weekly usage is an operational failure with a beautiful report.',
      },
      {
        es: 'El orden importa. Primero se estabiliza el proceso con un segundo equipo, luego se documenta con plantillas reales, y solo después se abre a toda la organización. Escalar el acceso antes de estabilizar es como repartir llaves antes de cerrar la cerradura.',
        en: 'Order matters. Stabilize the process with a second team first, then document it with real templates, and only then open it to the whole organization. Scaling access before stabilizing is like handing out keys before installing the lock.',
      },
      {
        es: 'Amplificar también implica comunicar límites. Un proceso ampliado necesita que la gente sepa cuándo NO usarlo: qué casos caen fuera, qué revisión humana sigue obligatoria, a quién llamar si la respuesta parece mal. La adopción crece cuando los límites son explícitos, no cuando se promete perfección.',
        en: 'Amplifying also means communicating limits. A scaled process needs people to know when NOT to use it: which cases are out of scope, which human review still applies, who to call when an answer looks wrong. Adoption grows when limits are explicit, not when perfection is promised.',
      },
      {
        es: 'El indicador final de la fase cuatro es silencioso: el piloto deja de ser una historia que se cuenta y pasa a ser una rutina que no se nota. Ese aburrimiento es la señal de que la IA se volvió trabajo, y el trabajo es exactamente donde queríamos que llegara.',
        en: 'The final indicator of phase four is quiet: the pilot stops being a story people tell and becomes a routine nobody notices. That boredom is the signal that AI turned into work, and work is exactly where we wanted it to land.',
      },
    ],
    category: 'Metodología',
    date: '2025-10-21',
    readMinutes: 7,
    author: 'Javier Peña',
  },
  {
    id: 'b-10',
    slug: 'chunking-no-es-un-hiperparametro',
    title: { es: 'Chunking no es un hiperparámetro: es una decisión de producto', en: 'Chunking is not a hyperparameter: it is a product decision' },
    excerpt: {
      es: 'El tamaño de tus fragmentos decide qué preguntas puede responder el sistema. Por eso pertenece a la hoja de ruta, no al tuning.',
      en: 'Your chunk size decides which questions the system can answer. That is why it belongs in roadmapping, not tuning.',
    },
    body: [
      {
        es: 'En casi todos los proyectos de RAG el chunking se trata como ajuste técnico: se prueba 500, luego 800, se mira qué opción gana en una métrica y se sigue adelante. Es un error caro, porque el tamaño del fragmento no optimiza la recuperación en abstracto: define qué tipo de pregunta el sistema podrá responder.',
        en: 'In almost every RAG project chunking is treated as a technical tweak: try 500, then 800, see which wins on a metric and move on. That is an expensive mistake, because chunk size does not optimize retrieval in the abstract: it defines which kind of question the system can answer.',
      },
      {
        es: 'Un fragmento pequeño favorece preguntas puntuales — el plazo de una cláusula, el precio de un artículo, el contacto de un proveedor — porque cada pieza contiene una sola afirmación fácil de comparar. Pero rompe las respuestas que requieren contexto: una explicación que empieza en el párrafo tres y concluye en el seis casi nunca sobrevive un corte de doscientas palabras.',
        en: 'Small chunks favor point questions — a clause deadline, a product price, a supplier contact — because each piece holds one claim easy to compare. But they break answers needing context: an explanation starting in paragraph three and concluding in paragraph six rarely survives a two-hundred-word cut.',
      },
      {
        es: 'El fragmento grande consigue lo contrario y añade un problema nuevo: al traer más contexto, compite consigo mismo. Si metes en el prompt cuatro fragmentos de dos mil palabras, el modelo recibe ocho mil palabras de material relacionado y la respuesta se vuelve difusa. Más contexto no es más verdad; es más ruido que pesar.',
        en: 'Large chunks achieve the reverse and add a new problem: with more context they compete with themselves. If you put four two-thousand-word chunks into the prompt, the model receives eight thousand words of related material and the answer turns vague. More context is not more truth; it is more noise to weigh.',
      },
      {
        es: 'La forma honesta de decidir es empezar por las preguntas, no por los documentos. Recoge veinte o treinta consultas reales de los usuarios — de las conversaciones de soporte, de las dudas del equipo, de los correos que se reenvían — y clasifícalas: de dato puntual, de procedimiento, de comparación, de síntesis. Cada familia pide una frontera de fragmento distinta.',
        en: 'The honest way to decide starts from questions, not documents. Collect twenty or thirty real user queries — from support conversations, team doubts, forwarded emails — and classify them: point-fact, procedure, comparison, synthesis. Each family calls for a different chunk boundary.',
      },
      {
        es: 'Sobre esa base aparecen estrategias que sí resuelven el conflicto. Separa por estructura antes que por longitud: encabezados, cláusulas, pasos numerados. Añade un resumen de sección como pieza adicional para las preguntas de síntesis. Guarda metadatos — fecha, área, documento madre — y filtra antes de recuperar, en lugar de intentar que el fragmento solo cargue con todo.',
        en: 'On that basis, strategies that actually resolve the conflict appear. Split by structure before length: headings, clauses, numbered steps. Add a section summary as an extra piece for synthesis questions. Store metadata — date, area, parent document — and filter before retrieving, instead of asking each chunk to carry everything.',
      },
      {
        es: 'Después mide por familia de pregunta, no con una cifra global. Un cambio de chunking que sube la precisión media cinco puntos puede hundir las preguntas de procedimiento del 80 % al 55 % sin que el promedio lo delate. Tu suite de evaluación necesita estar estratificada igual que tus consultas.',
        en: 'Then measure per question family, not on a single global figure. A chunking change lifting average precision five points can sink procedure questions from 80 % to 55 % without the average revealing it. Your evaluation suite needs the same stratification as your queries.',
      },
      {
        es: 'Por eso el chunking es decisión de producto. Implica elegir qué consultas serán excelentes y cuáles apenas aceptables, y eso depende de quién usa el sistema y para qué. Delegarlo a un experimento de rejilla sin esa conversación previa es entregar el producto a un azar bien documentado.',
        en: 'That is why chunking is a product decision. It means choosing which queries will be excellent and which merely acceptable, and that depends on who uses the system and for what. Delegating it to a grid search without that conversation hands the product over to well-documented chance.',
      },
      {
        es: 'Trátalo como diseño: lista de preguntas reales, frontera de fragmento justificada por familia, métricas estratificadas y una revisión cuando cambie el contenido del corpus. La herramienta es la misma; lo que cambia es quién decide y con qué evidencia.',
        en: 'Treat it as design: a list of real questions, a chunk boundary justified per family, stratified metrics and a review whenever corpus content changes. The tool is the same; what changes is who decides and on what evidence.',
      },
    ],
    category: 'Datos',
    date: '2026-09-30',
    readMinutes: 10,
    author: 'Miguel Santos',
    featured: true,
  },
  {
    id: 'b-11',
    slug: 'metricas-de-recuperacion-que-predicen-satisfaccion',
    title: { es: 'Métricas de recuperación que sí predicen la satisfacción', en: 'Retrieval metrics that actually predict satisfaction' },
    excerpt: {
      es: 'Recall@10 no le importa a nadie fuera del equipo técnico. Estas cuatro métricas conectan la recuperación con lo que el usuario nota.',
      en: 'Nobody outside engineering cares about recall@10. These four metrics connect retrieval to what users actually feel.',
    },
    body: [
      {
        es: 'El problema habitual con la evaluación de RAG es que se mide lo fácil y no lo importante. Calcular recall sobre mil pares pregunta-fuente es rápido y da una cifra limpia para el informe; el problema es que esa cifra casi nunca se mueve en la misma dirección que la experiencia real del usuario.',
        en: 'The usual problem with RAG evaluation is measuring what is easy rather than what matters. Computing recall over a thousand query-source pairs is fast and yields a clean report figure; the trouble is that figure almost never moves in the same direction as real user experience.',
      },
      {
        es: 'La primera métrica con valor predictivo es la tasa de "fuente ausente en la respuesta", medida sobre consultas reales de usuarios. Si la respuesta no cita ninguna fuente recuperada — o cita una que no está en el conjunto devuelto — el usuario lo detecta al instante, aunque el resto del texto sea correcto. Es fácil de instrumentar y duele en la demo.',
        en: 'The first metric with predictive value is the rate of "missing source in the answer" measured on real user queries. If an answer cites no retrieved source, or cites one outside the returned set, users spot it immediately even when the rest of the text is right. It is easy to instrument and it hurts in the demo.',
      },
      {
        es: 'La segunda es la posición del primer documento útil, o su equivalente en fusión de resultados: ¿en qué punto del ranking aparece por primera vez la pieza que contiene la respuesta? Un reranker que trae esa pieza del puesto ocho al puesto dos casi siempre mejora la satisfacción, aunque el recall@10 global apenas se mueva.',
        en: 'The second is the rank of the first useful document, or its fusion equivalent: where in the ranking does the piece containing the answer first appear? A reranker moving that piece from position eight to position two almost always improves satisfaction even when overall recall@10 barely moves.',
      },
      {
        es: 'La tercera mide la dispersión de evidencia en respuestas compuestas: cuántos fragmentos distintos se combinan para sostener una sola oración. Mucha dispersión sin causa justificada significa que el sistema está cosiendo fuentes débiles; el resultado lee bien pero se rompe al segundo repaso de un experto.',
        en: 'The third measures evidence spread on composite answers: how many distinct fragments combine to support a single sentence. Unjustified spread means the system is stitching weak sources; the result reads well but collapses on an expert second read.',
      },
      {
        es: 'La cuarta es humana y barata: la tasa de reescritura manual. ¿Cuántas veces el usuario copia la respuesta y la edita antes de usarla? Es una señal directa de que la recuperación no trajo material suficiente o trajo material equivocado. Regístrala desde el primer día, aunque sea con una encuesta de un clic.',
        en: 'The fourth is human and cheap: the manual rewrite rate. How often does a user copy an answer and edit it before use? It is a direct signal that retrieval brought insufficient or wrong material. Log it from day one, even with a one-click survey.',
      },
      {
        es: 'Junta las cuatro con un panel semanal segmentado por tipo de consulta. Las métricas agregadas ocultan los fallos: la global puede mejorar mientras las preguntas de procedimiento se deterioran. La segmentación es lo que convierte el panel en una herramienta de decisión.',
        en: 'Bundle the four into a weekly dashboard segmented by query type. Aggregates hide failures: the overall figure can improve while procedure questions decay. Segmentation is what turns the dashboard into a decision tool.',
      },
      {
        es: 'Y guarda una muestra de consultas reales con juicio humano cada mes. Ninguna métrica automática sustituye abrir diez respuestas y preguntarte si las usarías. Esa revisión trimestral es donde se detectan los cambios de corpus que ninguna deriva estadística alcanza a ver.',
        en: 'And keep a monthly sample of real queries with human judgment. No automatic metric replaces opening ten answers and asking whether you would use them. That periodic review is where corpus changes surface that no statistical drift metric can see.',
      },
    ],
    category: 'Datos',
    date: '2026-08-05',
    readMinutes: 7,
    author: 'Miguel Santos',
  },
  {
    id: 'b-12',
    slug: 'series-temporales-con-llms-cuando-funciona-y-cuando-es-teatro',
    title: { es: 'Series temporales con LLMs: cuándo funciona y cuándo es teatro', en: 'Time series with LLMs: when it works and when it is theater' },
    excerpt: {
      es: 'Un LLM no compite con un modelo de previsión clásico en su terreno. Donde gana es en contexto, no en aritmética.',
      en: 'An LLM does not beat a classic forecaster on its own turf. Where it wins is context, not arithmetic.',
    },
    body: [
      {
        es: 'Cada cierto tiempo aparece un artículo asegurando que los LLMs superan a los modelos de previsión clásicos. Lo que suele ocultar esa afirmación es que la comparación se hace con el LLM leyendo la serie como texto, contra una línea base mal ajustada, y sobre horizontes cortos. En terreno puro de números, el transformer de bolsillo no gana.',
        en: 'Every so often an article claims LLMs beat classic forecasting models. What such claims usually hide is that the LLM reads the series as text, compares against a poorly tuned baseline, and only over short horizons. On pure numerical ground, the pocket transformer does not win.',
      },
      {
        es: 'La primera regla práctica: nunca pidas a un modelo que haga la aritmética de la previsión por ti. Si le pasas los últimos sesenta puntos y le pides el valor del mes que viene, estás pidiendo estimación memorística, no cálculo. Los modelos clásicos — y su versión moderna con gradient boosting — siguen siendo la columna vertebral de cualquier previsión seria.',
        en: 'The first practical rule: never ask a model to do the forecasting arithmetic for you. Feeding sixty points and asking for next month is asking for memorized estimation, not computation. Classic models, and their gradient-boosting modern versions, remain the backbone of any serious forecast.',
      },
      {
        es: 'Donde el LLM sí aporta es en el contexto que los modelos numéricos no ven: festivos locales, campañas anunciadas, cambios de precio conocidos, huelgas, competencia que abre un local a dos calles. Ese conocimiento llega como texto, y los modelos tradicionales solo lo capturan si alguien lo convierte a mano en variables dummy.',
        en: 'Where the LLM does contribute is context the numeric models cannot see: local holidays, announced campaigns, known price changes, strikes, a competitor opening two streets away. That knowledge arrives as text, and traditional models only capture it if someone hand-converts it into dummy variables.',
      },
      {
        es: 'El patrón que funciona combina ambos: el modelo clásico genera la previsión base, y el LLM produce explicaciones de desviación y escenarios condicionados. "La demanda subirá un 12 % la semana del festival si no llueve" es una frase útil para planificación; la cifra concreta la pone el modelo numérico.',
        en: 'The pattern that works combines both: the classic model produces the base forecast, and the LLM generates deviation explanations and conditioned scenarios. "Demand will rise 12 % the week of the festival if it does not rain" is a useful sentence for planning; the numeric model supplies the figure.',
      },
      {
        es: 'Hay un segundo uso legítimo: convertir texto en variables. Extraer de notas comerciales, actas o titulares señales estructuradas — "campaña de radio en marzo", "avería de planta en febrero" — y alimentarlas como features al modelo de previsión. Aquí el LLM es un extractor, no un adivino, y su error se mide como cualquier otra feature.',
        en: 'There is a second legitimate use: turning text into features. Extracting structured signals from trade notes, minutes or headlines — "radio campaign in March", "plant outage in February" — and feeding them as features to the forecasting model. Here the LLM is an extractor, not an oracle, and its error is measured like any other feature.',
      },
      {
        es: 'Un tercer uso, menos obvio, es la evaluación cualitativa: pedir al modelo que revise una previsión y señale supuestos frágiles antes de publicarla. "Esta proyección asume que el descuento se mantiene dos meses" es una observación que ningún test automático detecta.',
        en: 'A third, less obvious use is qualitative review: asking the model to inspect a forecast and flag fragile assumptions before publication. "This projection assumes the discount holds for two months" is an observation no automatic test catches.',
      },
      {
        es: 'La trampa final es el teatro: poner un LLM delante de una serie y actuar como si su respuesta fuera una previsión con intervalos de confianza. Si no puedes mostrar el modelo de referencia, el error de validación y la contribución incremental de cada componente, no tienes un sistema de previsión: tienes una demo con números.',
        en: 'The final trap is theater: putting an LLM in front of a series and treating its reply as a forecast with confidence intervals. If you cannot show the reference model, the validation error and each component incremental contribution, you do not have a forecasting system: you have a demo with numbers.',
      },
      {
        es: 'Regla de bolsillo: la aritmética la hace el modelo clásico, el texto lo aporta el LLM, y la decisión la toma una persona que ve ambos. Mantén esas tres piezas separadas y ninguna comparación de titulares te desviará del camino.',
        en: 'Rule of thumb: arithmetic comes from the classic model, text comes from the LLM, and the decision belongs to a person who sees both. Keep those three pieces separate and no headline comparison will knock you off course.',
      },
    ],
    category: 'Datos',
    date: '2025-12-16',
    readMinutes: 8,
    author: 'Paula Gutiérrez',
  },
  {
    id: 'b-13',
    slug: 'privacidad-real-en-analisis-de-documentos-sensibles',
    title: { es: 'Privacidad real en análisis de documentos sensibles', en: 'Real privacy when analyzing sensitive documents' },
    excerpt: {
      es: 'La pregunta no es si tu proveedor de modelos es fiable, sino si necesita ver los datos en absoluto. Cinco capas concretas.',
      en: 'The question is not whether your model vendor is trustworthy, but whether it needs to see the data at all. Five concrete layers.',
    },
    body: [
      {
        es: 'Contratos médicos, nóminas, expedientes disciplinarios, informes periciales: los documentos que más valor tienen para el análisis son exactamente los que nunca deberían salir de tu perímetro sin control. La buena noticia es que hoy se puede analizar casi todo sin renunciar a la utilidad; la mala es que requiere decisiones explícitas, no una casilla de "datos no usados para entrenar".',
        en: 'Medical contracts, payslips, disciplinary files, expert reports: the documents most valuable for analysis are exactly the ones that should never leave your perimeter uncontrolled. The good news is you can now analyze almost anything without sacrificing utility; the bad is it takes explicit decisions, not a "data not used for training" checkbox.',
      },
      {
        es: 'Primera capa: redacción antes de la llamada. Sustituye identificadores, nombres y cifras sensibles por marcadores estables antes de enviar nada al modelo. Un marcador como [CLIENTE_017] conserva la estructura que el análisis necesita y elimina lo que el proveedor no debería ver. La clave es hacerlo determinista, para que las relaciones entre documentos se mantengan.',
        en: 'Layer one: redaction before the call. Replace identifiers, names and sensitive figures with stable markers before sending anything to the model. A marker like [CLIENT_017] keeps the structure analysis needs and removes what the vendor should not see. The key is determinism, so relationships across documents survive.',
      },
      {
        es: 'Segunda capa: arquitectura de confianza. Decide qué modelos corren dentro de tu red y cuáles se llaman fuera. Para clasificación y extracción de campos estructurados basta con modelos medianos alojados localmente; para redacción con criterio jurídico puede compensar una API externa sobre datos ya redactados. La frontera se dibuja por tarea, no por empresa.',
        en: 'Layer two: trust architecture. Decide which models run inside your network and which are called out. For classification and structured extraction, locally hosted mid-size models suffice; for legally nuanced drafting an external API may pay off on already-redacted data. Draw the boundary per task, not per vendor.',
      },
      {
        es: 'Tercera capa: separación de sesiones y ausencia de memoria. Ningún caso debería poder leer el material de otro, ni siquiera por coincidencia de contexto. En la práctica eso significa claves por proyecto, ausencia de caché compartida entre clientes y registros de acceso que otra persona pueda auditar.',
        en: 'Layer three: session separation and no memory. No case should be able to read another material, not even through context coincidence. In practice that means per-project keys, no shared cache across clients and access logs someone else can audit.',
      },
      {
        es: 'Cuarta capa: control de salida. El riesgo no termina cuando el modelo responde; empieza cuando la respuesta se copia a un tablero, un correo o un chat. Aplica validación de salida — detección de patrones que parezcan datos personales — y etiqueta las fuentes con el mismo nivel de clasificación del documento original.',
        en: 'Layer four: output control. Risk does not end when the model answers; it begins when the answer is copied into a dashboard, an email or a chat. Apply output validation — detection of patterns resembling personal data — and label sources with the same classification level as the original document.',
      },
      {
        es: 'Quinta capa: contrato y retención. Revisa los plazos de retención real de tu proveedor, si los registros humanos incluyen tus prompts y qué pasa cuando cancelas. La cláusula de no entrenamiento importa, pero menos que saber cuántos días subsiste una copia tras la cancelación.',
        en: 'Layer five: contract and retention. Check your vendor actual retention windows, whether human review logs include your prompts and what happens on cancellation. The no-training clause matters, but less than knowing how many days a copy survives after you cancel.',
      },
      {
        es: 'Ninguna capa es infalible por sí sola; la defensa viene del apilado. Y casi todas se pueden implementar en dos o tres semanas con el equipo que ya tiene el piloto funcionando. La privacidad no suele ser el freno real de los proyectos sensibles: la excusa de privacidad, a veces, sí lo es.',
        en: 'No single layer is foolproof; the defense comes from stacking. Most can be implemented in two or three weeks by the team already running the pilot. Privacy is rarely the real brake on sensitive projects: privacy as an excuse sometimes is.',
      },
    ],
    category: 'Datos',
    date: '2025-11-25',
    readMinutes: 8,
    author: 'Andrés Villalba',
  },
  {
    id: 'b-14',
    slug: 'como-evaluar-un-modelo-antes-de-creerte-el-benchmark',
    title: { es: 'Cómo evalúas un modelo antes de creerte el benchmark del proveedor', en: 'How to evaluate a model before trusting a vendor benchmark' },
    excerpt: {
      es: 'Los benchmarks publicados miden tareas que probablemente no son la tuya. Con una tarde bien montada tienes evaluación propia.',
      en: 'Published benchmarks measure tasks that are probably not yours. With one well-built afternoon you get your own evaluation.',
    },
    body: [
      {
        es: 'Cada proveedor publica una tabla donde su modelo gana. No es fraude: es selección. Eligen tareas, formatos de prompt y conjuntos de prueba donde su modelo brilla, y la comparación contra modelos ajenos se hace con su configuración. Para ti la pregunta útil es otra: ¿resuelve mis casos, con mis datos, a mi coste?',
        en: 'Every vendor publishes a table where its model wins. That is not fraud: it is selection. They choose tasks, prompt formats and test sets where their model shines, and comparisons against rivals run under their setup. The useful question for you is different: does it solve my cases, with my data, at my cost?',
      },
      {
        es: 'La evaluación propia empieza por una muestra de trabajo real, no por preguntas inventadas. Recoge entre cincuenta y doscientos casos representativos de tu flujo — tickets reales, documentos reales, consultas reales — con la respuesta que un experto aceptaría. Si esa muestra no existe, la primera tarea es producirla, aunque sean dos semanas.',
        en: 'Self-evaluation starts with a sample of real work, not invented questions. Gather fifty to two hundred cases representative of your flow — real tickets, real documents, real queries — with the answer an expert would accept. If that sample does not exist, producing it is the first task, even if it takes two weeks.',
      },
      {
        es: 'La puntuación debe separar tipos de error. Un fallo donde el modelo se inventa un dato duele mucho más que uno donde omite un detalle. Define categorías concretas — alucinación de hecho, omisión de restricción, formato inválido, tono inadecuado — y anota cada fallo en su cajón. La cifra global esconde cuál es el problema caro.',
        en: 'Scoring must separate error types. A failure where the model invents a fact hurts far more than one omitting a detail. Define concrete categories — fact hallucination, missed constraint, invalid format, wrong tone — and log each failure in its drawer. The global figure hides which problem is the expensive one.',
      },
      {
        es: 'Incluye un conjunto de adversidad. Casos donde el documento es ambiguo, donde la respuesta correcta es "no lo sé" y donde una instrucción tentadora debería ser ignorada. Sin ese conjunto, cualquier modelo parece fiable porque nunca se le presenta un atajo incómodo.',
        en: 'Include an adversarial set. Cases where the document is ambiguous, where the right answer is "I do not know" and where a tempting instruction should be ignored. Without it every model looks reliable because it is never offered an uncomfortable shortcut.',
      },
      {
        es: 'Mide coste y latencia con la misma seriedad que la calidad. Un modelo que gana ocho puntos y triplica el coste por caso puede ser la peor decisión del trimestre. Presenta siempre las tres cifras juntas — calidad, coste, latencia — porque las decisiones reales son de presupuesto, no de ranking.',
        en: 'Measure cost and latency with the same seriousness as quality. A model winning eight points at triple cost per case may be the quarter worst decision. Always present the three figures together — quality, cost, latency — because real decisions are budget decisions, not ranking decisions.',
      },
      {
        es: 'Congela la evaluación una vez montada. Si cambias la muestra cada vez que un modelo nuevo aparece, nunca tendrás serie histórica. Versiona el conjunto, guarda las corridas y añade casos solo en bloques, manteniendo la mitad intacta como terreno de prueba estable.',
        en: 'Freeze the evaluation once built. If you swap the sample every time a new model appears, you never get a history. Version the set, archive runs and add cases only in blocks, keeping half untouched as stable test ground.',
      },
      {
        es: 'Por último, automatiza la corrida y ponla en el calendario. Un modelo que parecía el mejor hace seis meses puede ya no serlo. Una ejecución mensual contra tu muestra con el informe de siempre te ahorra la discusión de recuerdo y te deja comparar contra datos, no contra impresiones.',
        en: 'Finally, automate the run and put it on the calendar. The model that looked best six months ago may no longer be. A monthly execution against your sample with the usual report saves the argument from memory and lets you compare on data rather than impressions.',
      },
      {
        es: 'Una tarde para montar la muestra, un día para el pipeline y una hora al mes para leerlo: es el coste mínimo para dejar de comprar a ciegas. Todo lo demás es fe bien contada.',
        en: 'One afternoon to build the sample, one day for the pipeline and an hour a month to read it: that is the minimum cost of stopping buying blind. Everything else is well-told faith.',
      },
    ],
    category: 'Herramientas',
    date: '2026-07-29',
    readMinutes: 8,
    author: 'Rodrigo Lima',
  },
  {
    id: 'b-15',
    slug: 'el-stack-minimo-de-un-equipo-de-ia-en-2026',
    title: { es: 'El stack mínimo de un equipo de IA en 2026', en: 'The minimal AI team stack in 2026' },
    excerpt: {
      es: 'Menos herramientas, más contratos. Una guía concreta de las siete piezas que un equipo necesita y las que puede ahorrarse.',
      en: 'Fewer tools, more contracts. A concrete guide to the seven pieces a team needs and the ones it can skip.',
    },
    body: [
      {
        es: 'Cada trimestre aparece una nueva categoría de herramienta de IA y el stack del equipo crece en una capa. Orquestadores, observabilidad, evaluación, plantillas, marketplaces de prompts: al final, medio equipo dedica más tiempo a mantener el andamio que a resolver el problema. El stack de 2026 que funciona es, sorprendentemente, más pequeño que el de 2024.',
        en: 'Every quarter a new AI tool category appears and the team stack grows a layer. Orchestrators, observability, evaluation, templates, prompt marketplaces: in the end half the team spends more time maintaining scaffolding than solving problems. The stack that works in 2026 is, surprisingly, smaller than the 2024 one.',
      },
      {
        es: 'Pieza uno: dos proveedores de modelo como máximo para empezar. Uno de propósito general con buena capacidad de razonamiento, otro barato y rápido para tareas mecánicas — clasificación, extracción, reformateo. Añadir un tercero solo se justifica con una ventaja medible en tu evaluación propia, no con un anuncio.',
        en: 'Piece one: two model vendors at most to start. One general-purpose model with strong reasoning, one cheap and fast for mechanical tasks — classification, extraction, reformatting. A third only earns its place with a measurable advantage on your own evaluation, not on an announcement.',
      },
      {
        es: 'Pieza dos: un almacén vectorial gestionado o Postgres con extensión de vectores. Si ya tienes Postgres, la extensión evita un sistema entero que mantener. La mayoría de equipos con menos de diez millones de fragmentos no necesita un servicio dedicado de búsqueda vectorial.',
        en: 'Piece two: a managed vector store or Postgres with a vector extension. If you already run Postgres, the extension avoids an entire system to maintain. Most teams under ten million chunks do not need a dedicated vector search service.',
      },
      {
        es: 'Pieza tres: registro de trazas desde el primer día. No hace falta una plataforma cara: una tabla con entrada, salida, herramientas llamadas, tokens, duración y identificador de sesión resuelve el 90 % de las preguntas de depuración. Lo que no se registra no se puede arreglar después.',
        en: 'Piece three: trace logging from day one. You do not need an expensive platform: a table with input, output, tools called, tokens, duration and session id answers 90 % of debugging questions. What is not logged cannot be fixed afterwards.',
      },
      {
        es: 'Pieza cuatro: evaluación propia en repositorio. Un directorio con casos, un script que ejecuta contra varios modelos y un informe en texto plano versionado. Esta pieza es la que más se pospone y la que más decisiones ahorra; quien la tiene deja de discutir de modelos por sensaciones.',
        en: 'Piece four: your own evaluation in the repository. A directory of cases, a script that runs against several models and a plain-text report under version control. This is the piece most postponed and the one saving the most decisions; whoever has it stops arguing about models on feeling.',
      },
      {
        es: 'Pieza cinco: presupuesto y alertas de coste. Un límite por proyecto y una notificación diaria. Es la herramienta con peor reputación por aburrida y mejor relación entre esfuerzo e impacto: un solo aviso temprano suele costar menos que un mes de suscripciones redundantes.',
        en: 'Piece five: cost budgets and alerts. A per-project limit and a daily notification. It has the most boring reputation and the best effort-to-impact ratio: a single early warning usually costs less than a month of redundant subscriptions.',
      },
      {
        es: 'Pieza seis: un entorno de reproducibilidad. Contenedores ligeros, semillas fijadas y datos versionados. Sin esto, cada "funciona en mi máquina" cuesta una tarde. Con esto, la mitad de las discusiones de regresión desaparecen porque se puede reconstruir exactamente qué cambió.',
        en: 'Piece six: a reproducibility environment. Light containers, fixed seeds and versioned data. Without it, every "works on my machine" costs an afternoon. With it, half the regression arguments vanish because you can rebuild exactly what changed.',
      },
      {
        es: 'Pieza siete: gente. Ninguna herramienta sustituye a una persona que entienda el problema de negocio y otra que entienda el comportamiento del modelo. Si tu stack es impresionante y tu equipo tiene una sola de esas dos capacidades, el stack va a perder contra el equipo.',
        en: 'Piece seven: people. No tool replaces a person who understands the business problem plus one who understands model behavior. If your stack is impressive and your team holds only one of those two capabilities, the stack will lose to the team.',
      },
      {
        es: 'Lo que puedes ahorrarte este año: el orquestador visual hasta que tengas más de cinco flujos, la plataforma de evaluación SaaS hasta que tu muestra pase de quinientos casos, y el marketplace de prompts mientras tu system prompt siga cabiendo en una pantalla. Añade complejidad cuando el dolor la pida, no cuando el catálogo la anuncie.',
        en: 'What you can skip this year: the visual orchestrator until you run more than five flows, the SaaS evaluation platform until your sample passes five hundred cases, and the prompt marketplace while your system prompt still fits on a screen. Add complexity when pain demands it, not when a catalog advertises it.',
      },
      {
        es: 'El stack correcto es el que puedes explicar en cinco minutos a alguien que llega nuevo, y cuyo coste mensual puedas justificar sin consultar a nadie. Todo lo demás es mobiliario.',
        en: 'The right stack is one you can explain in five minutes to someone new, whose monthly cost you can justify without asking anyone. Everything else is furniture.',
      },
    ],
    category: 'Herramientas',
    date: '2026-06-03',
    readMinutes: 11,
    author: 'Daniel Rojas',
    featured: true,
  },
  {
    id: 'b-16',
    slug: 'fine-tuning-con-lora-cuando-no-hacerlo',
    title: { es: 'Fine-tuning con LoRA: la guía de cuándo NO hacerlo', en: 'LoRA fine-tuning: the guide to when not to do it' },
    excerpt: {
      es: 'El 80 % de los equipos que plantean fine-tuning deberían mejorar contexto o evaluación. Seis señales para esperar.',
      en: 'Eighty percent of teams considering fine-tuning should improve context or evaluation instead. Six signals to wait.',
    },
    body: [
      {
        es: 'El fine-tuning con LoRA ha quedado barato, accesible y bien documentado, y eso ha creado una generación de equipos que lo consideran como primer recurso. La realidad de los despliegues dice lo contrario: en la mayoría de proyectos, afinar un modelo antes de ordenar contexto y evaluación es adelantarse a un problema que aún no entendemos.',
        en: 'LoRA fine-tuning has become cheap, accessible and well documented, and that created a generation of teams treating it as the first move. Deployment reality says otherwise: on most projects, fine-tuning before sorting context and evaluation is racing ahead of a problem we do not yet understand.',
      },
      {
        es: 'Señal uno: el error desaparece cuando das más contexto. Si el modelo se equivoca con instrucciones cortas y acierta cuando le adjuntas el documento completo, tu problema es de contexto, no de pesos. Un sistema de RAG bien construido corrige eso en días; un fine-tuning tarda semanas y sigue sin garantía.',
        en: 'Signal one: the error vanishes with more context. If the model fails on short instructions and succeeds when you attach the full document, your problem is context, not weights. A well-built RAG system fixes that in days; fine-tuning takes weeks with no guarantee.',
      },
      {
        es: 'Señal dos: el fallo es de formato y no de conocimiento. Salidas JSON rotas, campos faltantes, tags mal cerrados: eso se arregla con estructura de salida, validación y reintentos dirigidos. Afinar para conseguir formato es como pintar el coche para que arranque.',
        en: 'Signal two: the failure is format, not knowledge. Broken JSON output, missing fields, unclosed tags: that is fixed with output structure, validation and directed retries. Fine-tuning for format is like repainting a car to make it start.',
      },
      {
        es: 'Señal tres: no tienes evaluación propia. Si no puedes demostrar una mejora con una muestra congelada de tus casos, cualquier fine-tuning es una apuesta. El orden correcto es: muestra, línea base, iteración, comparación. Saltar el primero convierte el experimento en fe.',
        en: 'Signal three: you have no evaluation of your own. Without a frozen sample of your cases, any fine-tuning is a bet. The right order is: sample, baseline, iteration, comparison. Skipping the first turns the experiment into faith.',
      },
      {
        es: 'Señal cuatro: buscas conocimiento de dominio nuevo. Un modelo afinado no "aprende" tu base de datos; aprende patrones de estilo y distribución con los datos que das. Para conocimiento nuevo y consultable, el almacenamiento con recuperación sigue siendo la herramienta correcta, y es reversible cuando cambian los datos.',
        en: 'Signal four: you are chasing new domain knowledge. A fine-tuned model does not "learn" your database; it learns style and distribution patterns from the data you give. For new, queryable knowledge, a retrieval store remains the right tool, and it is reversible when data changes.',
      },
      {
        es: 'Señal cinco: tu muestra es pequeña o autocontenida. Menos de un millón de tokens de ejemplos limpios rara vez justifica el coste. Y si los ejemplos vienen de tres personas del mismo equipo, el modelo aprenderá sus manías, no el dominio.',
        en: 'Signal five: your sample is small or self-contained. Under a million tokens of clean examples rarely justifies the cost. And if the examples come from three people on the same team, the model will learn their quirks, not the domain.',
      },
      {
        es: 'Señal seis: el proveedor cambia de modelo base cada trimestre. Afinar sobre una base efímera es rehacer la casa sobre arena. En ese escenario, prioriza todo lo que vive encima del modelo — prompts, herramientas, recuperación — porque sobrevive a los cambios de versión.',
        en: 'Signal six: your vendor swaps the base model every quarter. Fine-tuning on a fleeting base means rebuilding on sand. In that scenario, prioritize everything living above the model — prompts, tools, retrieval — because it survives version changes.',
      },
      {
        es: 'Cuándo sí: necesitas tono y formato estables a volumen, tu evaluación propia muestra un techo claro de prompting, y tienes datos limpios en cantidad. Entonces LoRA es extraordinario: pocas horas de GPU, un adaptador ligero y una mejora medible y desplegable.',
        en: 'When yes: you need stable tone and format at volume, your own evaluation shows a clear prompting ceiling, and you have clean data in quantity. Then LoRA is excellent: a few GPU hours, a light adapter and a measurable, deployable gain.',
      },
      {
        es: 'El resumen cabe en una frase: afinar es la respuesta a un problema de comportamiento persistente y medido, no a la impresión de que el modelo no conoce tu empresa. Mide primero; los pesos, después.',
        en: 'The summary fits in one sentence: tuning is the answer to a persistent, measured behavioral problem, not to the feeling that the model does not know your company. Measure first; weights after.',
      },
    ],
    category: 'Herramientas',
    date: '2025-10-07',
    readMinutes: 8,
    author: 'Rodrigo Lima',
  },
  {
    id: 'b-17',
    slug: 'coste-de-llms-en-produccion-cinco-partidas',
    title: { es: 'Coste de LLMs en producción: las cinco partidas que se te escapan', en: 'LLM cost in production: the five line items that escape you' },
    excerpt: {
      es: 'El precio por millón de tokens es la cifra más visible y la menos importante. Dónde se va de verdad la factura.',
      en: 'Price per million tokens is the most visible figure and the least important. Where the bill actually goes.',
    },
    body: [
      {
        es: 'Toda conversación de coste de LLM empieza y termina con el precio por millón de tokens. Es una cifra cómoda porque se puede comparar entre proveedores en una tabla, y casi nunca describe lo que la empresa paga al final de mes. La factura real se compone de cinco partidas, y solo una de ellas aparece en la página de precios.',
        en: 'Every LLM cost conversation starts and ends with price per million tokens. It is a convenient figure because it compares across vendors in a table, and it almost never describes what the company pays at month end. The real bill has five line items, and only one appears on the pricing page.',
      },
      {
        es: 'Primera partida: los reintentos invisibles. Cada llamada que falla por formato, por límite de longitud o por tiempo de espera vuelve a consumir tokens completos. En sistemas con validación estricta, cinco a quince por ciento de las llamadas se repite; nadie lo ve porque el contador del dashboard muestra solo los intentos finales.',
        en: 'First line: invisible retries. Every call failing on format, length limit or timeout consumes full tokens again. On strict validation systems, five to fifteen percent of calls repeat; nobody sees it because the dashboard counter shows only final attempts.',
      },
      {
        es: 'Segunda partida: el contexto muerto. Muchos sistemas envían el historial completo, documentos que el modelo no consulta y ejemplos de poca relevancia en cada turno. El token más caro es el que se envía una y otra vez sin cambiar la respuesta — y es, con diferencia, el mayor desperdicio en la mayoría de productos.',
        en: 'Second line: dead context. Many systems ship the full history, documents the model never reads and marginally relevant examples on every turn. The most expensive token is the one sent repeatedly without changing the answer — by far the biggest waste in most products.',
      },
      {
        es: 'Tercera partida: la sobrerazonación. Delegar tareas mecánicas a modelos caros multiplica la factura sin mejorar resultados. Clasificar un ticket, extraer tres campos o reformatear una tabla no necesita el mejor modelo del mercado; necesitas el más barato que supere tu umbral de calidad, y ese umbral hay que medirlo, no suponerlo.',
        en: 'Third line: over-reasoning. Delegating mechanical tasks to expensive models inflates the bill without improving results. Classifying a ticket, extracting three fields or reformatting a table does not need the market best model; it needs the cheapest one clearing your quality bar, and that bar must be measured, not assumed.',
      },
      {
        es: 'Cuarta partida: la latencia pagada en desperdicio humano. Si tu asistente tarda ocho segundos, el usuario espera, reescribe o repite. El tiempo perdido de cien personas al día suele costar más que todos los tokens. Optimizar calidad sin mirar latencia es un ahorro que se paga en sueldo.',
        en: 'Fourth line: latency paid as human waste. If your assistant takes eight seconds, users wait, retype or repeat. A hundred people daily losing time usually costs more than all the tokens. Optimizing quality while ignoring latency is a saving paid in salary.',
      },
      {
        es: 'Quinta partida: el coste de operación que nadie etiqueta. Trazas, almacenes vectoriales, reindexados, evaluación automática, cuadernos de análisis: todo eso corre en la misma factura de nube y se codea con el gasto de IA sin distinguirse. Sin etiquetado de gasto por proyecto, cada equipo cree que su uso es gratuito.',
        en: 'Fifth line: untagged operations cost. Traces, vector stores, reindexing, automated evaluation, analysis notebooks: all of it runs on the same cloud bill, mixed with AI spend and untagged. Without per-project cost tagging, every team believes its usage is free.',
      },
      {
        es: 'El orden de ataque es previsible: primero caché y recorte de contexto, porque ahorran sin tocar calidad; después enrutado por tarea; luego presupuestos por proyecto con alerta diaria; y solo al final, negociación de precios con el proveedor. Los equipos que empiezan por negociar llegan a la última ronda sin haber tocado el 40 % de desperdicio interno.',
        en: 'The attack order is predictable: caching and context trimming first, because they save without touching quality; then task-based routing; then per-project budgets with daily alerts; and only at the end, vendor price negotiation. Teams that start negotiating reach the final round having untouched 40 % of internal waste.',
      },
      {
        es: 'Pon las cinco partidas en un informe mensual de una página. Cuando la cifra se desglosa, la conversación con finanzas deja de ser defensiva y se vuelve una decisión de ingeniería con números compartidos.',
        en: 'Put all five line items in a one-page monthly report. Once the figure is itemized, the conversation with finance stops being defensive and becomes an engineering decision on shared numbers.',
      },
    ],
    category: 'Herramientas',
    date: '2025-09-23',
    readMinutes: 6,
    author: 'Óscar Delgado',
  },
  {
    id: 'b-18',
    slug: 'leer-un-paper-de-ia-en-40-minutos',
    title: { es: 'Cómo leer un paper de IA en 40 minutos', en: 'How to read an AI paper in 40 minutes' },
    excerpt: {
      es: 'Un protocolo de lectura en cuatro pasos que separa el resultado sólido del resultado presentado con buen maquillaje.',
      en: 'A four-step reading protocol separating solid results from well-makeup results.',
    },
    body: [
      {
        es: 'La mayoría de profesionales abandonan los papers porque los leen como si fueran libros: de principio a fin, con la obligación de entender cada derivación. Ese enfoque no solo es lento, además es innecesario. Un paper de investigación se lee como un expediente: primero se evalúa la credibilidad, después merece la pena el detalle.',
        en: 'Most professionals abandon papers because they read them like books: start to finish, obliged to follow every derivation. That approach is not only slow, it is unnecessary. A research paper is read like a case file: assess credibility first, detail afterwards.',
      },
      {
        es: 'Primer paso, cinco minutos: título, abstract e introducción con una única pregunta. ¿Qué afirma este trabajo que antes no estaba establecido? Si no puedes responder en una frase, sigue leyendo hasta que puedas, porque sin esa frase no sabrás qué mirar en las tablas.',
        en: 'Step one, five minutes: title, abstract and introduction with a single question. What does this work claim that was not established before? If you cannot answer in one sentence, keep reading until you can, because without that sentence you will not know what to look for in the tables.',
      },
      {
        es: 'Segundo paso, diez minutos: métodos con lápiz. Anota tres cosas: de dónde salen los datos, contra qué se compara el sistema propuesto y qué variable cambia respecto a lo anterior. Si los datos son privados o la línea base es débil, márcalo; ya sabes qué escepticismo aplicar al resto.',
        en: 'Step two, ten minutes: methods with a pencil. Note three things: where the data comes from, what the proposed system is compared against, and what variable changes relative to prior work. If data is private or the baseline is weak, mark it; you already know what skepticism to apply.',
      },
      {
        es: 'Tercer paso, quince minutos: resultados con foco en tablas y figuras, no en prosa. Busca intervalos de confianza, número de repeticiones y tamaños de muestra. Una mejora de dos puntos sin varianza reportada es una mejora de adjetivos; el texto puede adornarlo, la tabla no.',
        en: 'Step three, fifteen minutes: results focused on tables and figures, not prose. Look for confidence intervals, run counts and sample sizes. A two-point gain with no reported variance is an adjective gain; the text can decorate it, the table cannot.',
      },
      {
        es: 'Cuarto paso, cinco minutos: limitaciones y trabajo futuro, leídos al revés. Es donde los autores suelen confesar lo que el abstract esconde — generalización a otros dominios, coste de cómputo, dependencia de una línea base concreta. Si esa sección está vacía, desconfía más.',
        en: 'Step four, five minutes: limitations and future work, read backwards. This is where authors often confess what the abstract hides — generalization to other domains, compute cost, dependence on a specific baseline. If that section is empty, distrust harder.',
      },
      {
        es: 'El paso que casi nadie hace: comprobar una cita. Elige la afirmación central del paper y abre una de las referencias que la sostiene. En pocos minutos sabrás si la línea base fue descrita con justicia. Es la comprobación más rápida de honestidad que existe.',
        en: 'The step almost nobody takes: check one citation. Pick the paper central claim and open one of the references backing it. Within minutes you will know whether the baseline was described fairly. It is the fastest honesty check there is.',
      },
      {
        es: 'Cuarenta minutos no convierten a nadie en experto del campo, pero sí producen algo mejor: una opinión informada con dudas localizadas. Guarda el paper y vuelve a él solo si la idea sobrevive a este protocolo.',
        en: 'Forty minutes do not make anyone an expert in the field, but they produce something better: an informed opinion with located doubts. Save the paper and return to it only if the idea survives the protocol.',
      },
    ],
    category: 'Investigación',
    date: '2026-08-19',
    readMinutes: 5,
    author: 'Isabel Kramer',
  },
  {
    id: 'b-19',
    slug: 'reproducir-un-experimento-ajeno',
    title: { es: 'Reproducir un experimento ajeno: la mejor escuela gratuita', en: 'Reproducing someone else experiment: the best free school' },
    excerpt: {
      es: 'Repetir el resultado de otro equipo enseña más que cien tutoriales. Un método en cinco pasos para hacerlo sin volverte loco.',
      en: 'Reproducing another team results teaches more than a hundred tutorials. A five-step method that keeps you sane.',
    },
    body: [
      {
        es: 'Existe una diferencia enorme entre entender un método y haberlo ejecutado. Quien reproduce un experimento ajeno descubre de golpe todo lo que el paper no contó: el preprocesamiento que daban por obvio, el ajuste fino de hiperparámetros que se tragó dos semanas, la semilla que cambia tres puntos el resultado.',
        en: 'There is a huge difference between understanding a method and having executed it. Anyone reproducing someone else experiment suddenly discovers everything the paper left out: preprocessing taken for granted, hyperparameter tuning that swallowed two weeks, a seed that moves the result three points.',
      },
      {
        es: 'Paso uno: elige un experimento con alcance modesto. Un resultado de una tabla, no un sistema entero. Reproducir el artículo completo es un proyecto de meses; reproducir una cifra es un proyecto de un fin de semana con aprendizaje comparable.',
        en: 'Step one: pick a modestly scoped experiment. One result from one table, not a whole system. Reproducing the full article is a months-long project; reproducing one figure is a weekend project with comparable learning.',
      },
      {
        es: 'Paso dos: escribe la hipótesis antes de tocar código. "Este método debería superar a esa línea base por al menos tres puntos con el mismo presupuesto de datos". Si no puedes enunciar qué esperas, no sabrás si la reproducción ha funcionado o si simplemente has construido otra cosa.',
        en: 'Step two: write the hypothesis before touching code. "This method should beat that baseline by at least three points with the same data budget". If you cannot state what you expect, you will not know whether the reproduction worked or you simply built something else.',
      },
      {
        es: 'Paso tres: reconstruye primero el entorno. Mismas versiones de bibliotecas, mismo esquema de datos, mismas métricas con la misma implementación. Cada desviación en esta fase introduce ruido que luego atribuirás al método. La disciplina aquí es aburrida y es exactamente el punto.',
        en: 'Step three: rebuild the environment first. Same library versions, same data schema, same metric with the same implementation. Every deviation here injects noise you will later attribute to the method. The discipline is boring, and that is exactly the point.',
      },
      {
        es: 'Paso cuatro: documenta las desviaciones con la misma seriedad que los aciertos. "Con este dataset obtuve 2 puntos menos" es información de investigación valiosísima; anótala con cifras, no con impresiones. Esas notas son, en la práctica, tu primera contribución original.',
        en: 'Step four: document deviations with the same seriousness as successes. "Two points lower on this dataset" is genuinely valuable research information; record it with figures, not impressions. Those notes are, in practice, your first original contribution.',
      },
      {
        es: 'Paso cinco: compara contra tu propia línea base ingenua, no solo contra la publicada. A veces descubres que un método sofisticado apenas gana a una regla simple cuando los datos son ruidosos. Ese descubrimiento — que la sofisticación no siempre compensa — es el que más caro sale aprender en producción.',
        en: 'Step five: compare against your own naive baseline, not just the published one. Sometimes a sophisticated method barely beats a simple rule when data is noisy. That discovery — sophistication does not always pay — is the most expensive one to learn in production.',
      },
      {
        es: 'Si tu reproducción funciona tres veces de tres, ya sabes algo que los autores solo afirman. Si falla tres veces de tres y el código oficial tampoco lo consigues, también has aprendido algo: que el resultado publicado necesita condiciones que no se describen. Ambas salidas son conocimiento; ninguna es tiempo perdido.',
        en: 'If your reproduction works three times out of three, you know something the authors merely claim. If it fails three times out of three and the official code does not deliver either, you learned something too: the published result needs conditions that go undescribed. Both outcomes are knowledge; neither is wasted time.',
      },
    ],
    category: 'Investigación',
    date: '2025-12-02',
    readMinutes: 6,
    author: 'Isabel Kramer',
  },
  {
    id: 'b-20',
    slug: 'red-teaming-accesible-ataca-tu-sistema-antes',
    title: { es: 'Red teaming accesible: cómo atacar tu propio sistema antes que lo haga otro', en: 'Accessible red teaming: how to attack your own system first' },
    excerpt: {
      es: 'No necesitas un laboratorio ni un experto en seguridad para empezar. Necesitas un catálogo, un equipo y una tarde.',
      en: 'You need no lab or security expert to start. You need a catalog, a team and an afternoon.',
    },
    body: [
      {
        es: 'La mayoría de equipos con sistemas de IA actúan como si la seguridad fuera un servicio que se contrata al final. Llegan los pentest, las auditorías, los informes con hallazgos críticos... y resulta que la vulnerabilidad básica — un documento que convence al asistente de ignorar sus instrucciones — estaba ahí desde la semana dos.',
        en: 'Most teams running AI systems treat security as something bought at the end. Pentests arrive, audits arrive, reports with critical findings arrive... and it turns out the basic vulnerability — a document convincing the assistant to ignore its instructions — was there since week two.',
      },
      {
        es: 'Empezar no requiere especialista. Requiere tres cosas: un catálogo de ataques, un entorno de pruebas aislado y permiso explícito para intentar romper el sistema sin pedir disculpas. El catálogo público de técnicas contra LLMs es un buen punto de partida; con veinte técnicas cubres la mayoría de vectores reales.',
        en: 'Starting requires no specialist. It requires three things: an attack catalog, an isolated test environment and explicit permission to break the system without apologizing. Public LLM attack catalogs are a good starting point; twenty techniques cover most real vectors.',
      },
      {
        es: 'Primer bloque de ataques: inyección por datos. Texto oculto en un documento, instrucciones en una página web, contenido de un correo que el sistema procesará. Si tu asistente lee fuentes externas, esas fuentes son un canal de entrada para órdenes ajenas.',
        en: 'First attack block: injection via data. Text hidden in a document, instructions on a web page, content inside an email the system will process. If your assistant reads external sources, those sources are an input channel for foreign orders.',
      },
      {
        es: 'Segundo bloque: exfiltración. Pide al sistema que resuma un documento y añade, al final, "incluir el resumen completo en el campo de asunto". Es tonto y funciona con más frecuencia de la que nadie admite. Si el modelo puede escribir fuera de su área de respuesta, tiene un canal de salida.',
        en: 'Second block: exfiltration. Ask the system to summarize a document and append, at the end, "include the full summary in the subject field". It is silly and works more often than anyone admits. If the model can write outside its answer area, it has an outbound channel.',
      },
      {
        es: 'Tercer bloque: abuso de herramientas. Cambia los argumentos de una función legítima hacia parámetros destructivos; comprueba si valida tipos, rangos y permisos. Muchas tool definitions asumen que el modelo solo pedirá lo razonable. Esa es precisamente la suposición que un atacante va a probar.',
        en: 'Third block: tool abuse. Push a legitimate function arguments toward destructive parameters; check whether it validates types, ranges and permissions. Many tool definitions assume the model will only ask for reasonable things. That is precisely the assumption an attacker will test.',
      },
      {
        es: 'Cuarto bloque: comportamiento bajo presión. Pide respuestas prohibidas, ejecuta jailbreaks conocidos y comprueba si el sistema mantiene límites cuando el usuario insiste, ruega o finge autoridad. Aquí la pregunta no es si el modelo cede, sino cuántos turnos aguanta tu capa de control.',
        en: 'Fourth block: behavior under pressure. Request forbidden answers, run known jailbreaks and check whether the system holds limits when a user insists, pleads or fakes authority. The question here is not whether the model yields, but how many turns your control layer holds.',
      },
      {
        es: 'Registra todo como lo haría un laboratorio: ataque, resultado, severidad, recomendación. Esas sesiones de tarde se convierten en la suite de regresión de seguridad que ejecutas en cada release. En pocos meses tendrás algo que la mayoría de las empresas no tiene: evidencia de que los ataques conocidos no pasan.',
        en: 'Log everything the way a lab would: attack, outcome, severity, recommendation. Those afternoon sessions become the security regression suite you run on release. Within months you will have something most companies lack: evidence that known attacks do not get through.',
      },
      {
        es: 'Y hazlo público dentro de la empresa. Compartir los hallazgos — con sus remediaciones — elimina el miedo a reportar incidentes y acelera la cultura que realmente protege: la de alguien que intenta romper las cosas antes que un desconocido lo haga por ti.',
        en: 'And make it public inside the company. Sharing findings — with their fixes — removes the fear of reporting incidents and accelerates the culture that actually protects: one where someone tries to break things before a stranger does it for you.',
      },
    ],
    category: 'Investigación',
    date: '2025-10-14',
    readMinutes: 8,
    author: 'Nicolás Ferrer',
  },
  {
    id: 'b-21',
    slug: 'que-medimos-en-2000-profesionales-de-ia',
    title: { es: 'Qué medimos en 2.000 profesionales de IA', en: 'What we measure across 2,000 AI professionals' },
    excerpt: {
      es: 'Tres años de datos de formación muestran un patrón incómodo: la brecha no está en herramientas, está en evaluación.',
      en: 'Three years of training data show an uncomfortable pattern: the gap is not in tools, it is in evaluation.',
    },
    body: [
      {
        es: 'Llevamos tres años registrando cómo aprenden y dónde fallan los profesionales que pasan por nuestros programas: dos mil personas, cuarenta países, desde analistas hasta científicos de investigación. Los datos no son un estudio académico, pero sí una muestra sesgada hacia gente que ya quiso mejorar. Eso hace más interesantes los patrones, no menos.',
        en: 'We have spent three years recording how professionals learn and where they fail across our programs: two thousand people, forty countries, from analysts to research scientists. The data is not an academic study, but it is a sample biased toward people who already wanted to improve. That makes the patterns more interesting, not less.',
      },
      {
        es: 'Primer hallazgo: el salto de calidad más grande no viene de dominar una herramienta nueva, sino de empezar a evaluar. Las personas que montan su primera suite de casos medibles mejoran más en ocho semanas que quienes acumulan tres certificaciones de plataforma distintas.',
        en: 'Finding one: the biggest quality jump does not come from mastering a new tool, but from starting to evaluate. People building their first measurable case suite improve more in eight weeks than those collecting three different platform certifications.',
      },
      {
        es: 'Segundo hallazgo: la brecha entre perfiles técnicos y de negocio se estrecha rápido cuando trabajan juntos. En retos mixtos, el participante no técnico aporta mejores criterios de éxito desde el primer día; el técnico aporta ejecución. Por separado, ambos tardan meses en descubrir lo que le falta al otro.',
        en: 'Finding two: the gap between technical and business profiles narrows fast when they work together. On mixed challenges, the non-technical participant contributes better success criteria from day one; the technical one contributes execution. Apart, both take months to discover what the other lacks.',
      },
      {
        es: 'Tercer hallazgo: el tiempo semanal declarado importa menos que su constancia. Quien dedica cuatro horas repartidas en cuatro días rinde por encima de quien dedica ocho horas el domingo. La retención a seis meses se explica casi entera por esta variable, no por la dificultad del track elegido.',
        en: 'Finding three: declared weekly hours matter less than consistency. Someone doing four hours spread across four days outperforms someone doing eight on Sunday. Six-month retention is almost fully explained by this variable, not by the difficulty of the chosen track.',
      },
      {
        es: 'Cuarto hallazgo: los errores más costosos en proyectos reales no son técnicos. Definir mal el problema y no fijar criterio de éxito aparecen juntos en más de la mitad de los postmortems que recogemos. Esos dos fallos no se corrigen con más Python; se corrigen con disciplina de definición.',
        en: 'Finding four: the costliest errors in real projects are not technical. Poor problem framing and missing success criteria appear together in more than half of the postmortems we collect. Those two failures are not fixed with more Python; they are fixed with definition discipline.',
      },
      {
        es: 'Quinto hallazgo: el idioma de trabajo condiciona el resultado más de lo esperado. Los mismos ejercicios producen mejor calidad de respuesta cuando el participante trabaja en su lengua materna y solo después traduce al contexto de la empresa. La fluidez en inglés no compensa la pérdida de precisión conceptual.',
        en: 'Finding five: working language shapes results more than expected. The same exercises produce better answers when participants work in their mother tongue and translate into company context afterwards. English fluency does not offset the loss of conceptual precision.',
      },
      {
        es: 'Lo que no medimos sirve tanto como lo que sí: no rastreamos pantallas ni productividad de empleados. La utilidad de estos datos depende de que la gente pueda ser honesta sobre sus fallos, y esa honestidad se rompe en cuanto la métrica se usa para evaluar en lugar de para aprender.',
        en: 'What we do not measure matters as much as what we do: we do not track screens or employee productivity. These data stay useful only if people can be honest about failures, and that honesty breaks the moment a metric is used to judge rather than to learn.',
      },
      {
        es: 'Si tu equipo quiere un diagnóstico rápido, empieza por ahí: pide tres proyectos terminados con su métrica de éxito, tres fracasos documentados y una suite de evaluación que otra persona pueda ejecutar. Eso describe mejor un nivel real que cualquier autoevaluación de cinco estrellas.',
        en: 'If your team wants a quick diagnosis, start there: ask for three completed projects with their success metric, three documented failures and an evaluation suite someone else can run. That describes a real level far better than any five-star self-assessment.',
      },
    ],
    category: 'Comunidad',
    date: '2026-09-09',
    readMinutes: 8,
    author: 'Renata Silva',
  },
  {
    id: 'b-22',
    slug: 'hackathon-distribuido-nueve-zonas-horarias',
    title: { es: 'Cómo organizamos un hackathon distribuido en nueve zonas horarias', en: 'How we run a distributed hackathon across nine time zones' },
    excerpt: {
      es: 'Un evento global funciona cuando el reloj deja de ser un problema logístico y pasa a ser una regla del juego explícita.',
      en: 'A global event works when the clock stops being a logistics problem and becomes an explicit rule of the game.',
    },
    body: [
      {
        es: 'Un hackathon con participantes de Bogotá a Yakarta suele fracasar por la misma causa: se programa todo en la zona horaria de la organización. Media comunidad se conecta a medianoche, la otra mitad se pierde la entrega y el evento se convierte en una transmisión que nadie ve en directo.',
        en: 'A hackathon spanning Bogotá to Jakarta usually fails the same way: everything is scheduled in the organizers time zone. Half the community logs in at midnight, the other half misses the submission, and the event becomes a broadcast nobody watches live.',
      },
      {
        es: 'Nuestra primera regla es que ninguna sesión obligatoria se repita dos veces la misma semana sin retransmisión asíncrona grabada. Todo lo que se anuncia en directo se documenta el mismo día en texto, con las decisiones tomadas. Así la zona horaria deja de ser una desventaja competitiva.',
        en: 'Our first rule: no mandatory session happens twice in the same week without an async recorded replay. Everything announced live is documented the same day in text, with decisions taken. That way time zone stops being a competitive disadvantage.',
      },
      {
        es: 'La segunda regla es que los equipos se forman antes del evento, no durante. Mezclar personas que se conocen a las nueve de la mañana de un viernes produce equipos por proximidad horaria. Formarlos con una semana de antelación — con un canal propio y una primera llamada de presentación — reparte la diversidad geográfica por diseño.',
        en: 'Second rule: teams form before the event, not during it. Mixing people who happen to be online at nine on a Friday morning produces teams by geographic convenience. Forming them a week ahead — with a dedicated channel and an intro call — distributes geographic diversity by design.',
      },
      {
        es: 'Tercera regla: el reto se entrega en dos entregas escalonadas. Primero el planteamiento del problema y el plan a las 48 horas, después el prototipo final. De este modo, un equipo que empieza tarde puede recibir feedback estructurado y reorientarse, en lugar de competir contra un producto terminado.',
        en: 'Third rule: the challenge ships in two staggered submissions. Problem framing and plan at 48 hours, final prototype afterwards. That way a team starting late can receive structured feedback and pivot instead of competing against a finished product.',
      },
      {
        es: 'Cuarta regla: mentores en turno continuo. Publicamos un calendario con franjas de dos horas y responsables por región; cada equipo sabe cuándo hay alguien despierto y disponible para desbloquear. El 60 % de los desbloqueos ocurren en esas franjas, no en la llamada grande de apertura.',
        en: 'Fourth rule: continuous mentor shifts. We publish a calendar of two-hour slots with region owners, so every team knows when someone is awake and available. Sixty percent of unblocking happens in those slots, not in the big opening call.',
      },
      {
        es: 'La quinta regla es la más impopular: la evaluación es ciega al horario. Los jueces revisan demos grabadas de máximo ocho minutos, sin conocer la hora local del equipo. Sin esta regla, los equipos con mejor franja horaria acumulan ventaja por pura cercanía al momento del anuncio.',
        en: 'The fifth rule is the least popular: judging is blind to schedule. Judges review recorded demos of at most eight minutes without knowing a team local time. Without it, teams in convenient slots accumulate advantage purely by proximity to the announcement moment.',
      },
      {
        es: 'Comunicamos todo esto en un documento de reglas que se lee en cinco minutos, y lo repetimos en cada recordatorio. Un evento distribuido no se sostiene con buena voluntad: se sostiene con reglas explícitas sobre el tiempo, la comunicación y la evaluación.',
        en: 'We publish all of this in a rules document readable in five minutes and repeat it in every reminder. A distributed event does not run on goodwill: it runs on explicit rules about time, communication and judging.',
      },
      {
        es: 'El resultado tras cuatro ediciones: sesenta y ocho equipos terminados de los setenta y uno inscritos, y una comunidad que ya sabe cómo colaborar a distancia antes de que empiece el reloj.',
        en: 'The result after four editions: sixty-eight teams finished out of seventy-one registered, and a community that already knows how to collaborate remotely before the clock starts.',
      },
    ],
    category: 'Comunidad',
    date: '2025-11-11',
    readMinutes: 7,
    author: 'Daniela Paredes',
  },
  {
    id: 'b-23',
    slug: 'mentorias-que-funcionan-formato-de-45-minutos',
    title: { es: 'Mentorías que funcionan: el formato de 45 minutos', en: 'Mentoring that works: the 45-minute format' },
    excerpt: {
      es: 'Cuarenta y cinco minutos con preparación obligatoria supera a sesiones largas sin agenda. Un guion que usamos cada semana.',
      en: 'Forty-five minutes with mandatory preparation beats long agenda-less sessions. A script we use weekly.',
    },
    body: [
      {
        es: 'La mayoría de las mentorías fracasan por exceso de amabilidad. Sesión larga, charla agradable, consejos dispersos, ningún acuerdo concreto. Al día siguiente ambas partes recuerdan que "fue útil" pero no pueden nombrar una decisión que haya cambiado. Ese es el síntoma exacto que nuestro formato busca eliminar.',
        en: 'Most mentoring fails from excess kindness. Long session, pleasant chat, scattered advice, no concrete agreement. The next day both sides remember it "was useful" but cannot name a decision that changed. That is precisely the symptom our format is built to remove.',
      },
      {
        es: 'La preparación es obligatoria y corta: el mentorado envía un párrafo con el contexto, otro con la decisión que quiere tomar y un enlace con el material relevante. Si esos tres elementos no llegan con 24 horas de antelación, la sesión se mueve. Sin preparación no hay mentoría; hay conversación improvisada.',
        en: 'Preparation is mandatory and short: the mentee sends one paragraph of context, one with the decision they want to make and a link to the relevant material. If those three elements do not arrive 24 hours ahead, the session moves. Without preparation there is no mentoring; there is improvised chat.',
      },
      {
        es: 'Los primeros diez minutos siguen una regla: preguntas, no consejos. El mentor entiende el terreno — quién decide, qué restricciones existen, qué se intentó ya. La tentación de soltar la respuesta en el minuto dos es la forma más rápida de que el mentorado deje de pensar.',
        en: 'The first ten minutes follow one rule: questions, not advice. The mentor understands the terrain — who decides, what constraints exist, what was already tried. The temptation to deliver the answer at minute two is the fastest way to stop the mentee thinking.',
      },
      {
        es: 'El minuto once tiene un solo producto: la formulación del problema escrita en una frase, en pantalla, acordada por ambos. Si la frase no se puede escribir, el problema aún no está listo para la mentoría. Este bloqueo explícito evita gastar treinta minutos tratando síntomas.',
        en: 'Minute eleven produces exactly one thing: the problem statement written in one sentence, on screen, agreed by both. If the sentence cannot be written, the problem is not ready for mentoring. That explicit gate prevents spending thirty minutes treating symptoms.',
      },
      {
        es: 'Después vienen alternativas — nunca una, siempre al menos tres — con su coste, reversibilidad y lo que habría que aprender para descartar cada una. El mentor aporta ejemplos de casos vistos; el mentorado decide. Esa frontera mantiene la propiedad de la decisión donde debe estar.',
        en: 'Then come alternatives — never one, always at least three — with their cost, reversibility and what you would need to learn to discard each. The mentor contributes cases seen before; the mentee decides. That boundary keeps ownership of the decision where it belongs.',
      },
      {
        es: 'El minuto treinta y cinco es el acuerdo: qué se hace, con quién, para cuándo y cómo sabremos si funcionó. Se escribe en el canal de la sesión y se revisa en el siguiente encuentro. Sin este cierre, el 80 % de las buenas ideas de mentoría mueren en el olvido entre una sesión y otra.',
        en: 'Minute thirty-five is the commitment: what gets done, with whom, by when and how we will know it worked. It is written into the session channel and reviewed at the next meeting. Without that close, eighty percent of good mentoring ideas die in the gap between sessions.',
      },
      {
        es: 'Los últimos cinco minutos son para lo único que una sesión larga no permite: señalar lo que el mentor vio y no encaja. Un comentario breve y específico — "tu criterio de éxito es una sensación, no una cifra" — vale más que una hora de marco general.',
        en: 'The last five minutes go to the one thing a long session never permits: naming what the mentor saw that does not fit. One short, specific comment — "your success criterion is a feeling, not a figure" — is worth more than an hour of general framework.',
      },
      {
        es: 'Cuarenta y cinco minutos, tres preparaciones y un acuerdo escrito. Es un formato que se puede repetir cincuenta veces al año sin agotar a nadie, y eso es lo que hace que funcione: la constancia, no la intensidad.',
        en: 'Forty-five minutes, three inputs and one written commitment. It is a format you can repeat fifty times a year without exhausting anyone, and that is what makes it work: consistency, not intensity.',
      },
    ],
    category: 'Comunidad',
    date: '2025-09-30',
    readMinutes: 7,
    author: 'Camila Duarte',
  },
  {
    id: 'b-24',
    slug: 'del-taller-corporativo-al-cambio-de-habitos',
    title: { es: 'Del taller corporativo al cambio de hábitos', en: 'From corporate workshop to changed habits' },
    excerpt: {
      es: 'Un taller inspira una tarde; un hábito dura años. Las cinco condiciones que convierten el evento en práctica de equipo.',
      en: 'A workshop inspires an afternoon; a habit lasts years. The five conditions that turn an event into team practice.',
    },
    body: [
      {
        es: 'El taller corporativo de IA tiene un problema de supervivencia conocido: el lunes todo el mundo prueba la herramienta, el viernes la mitad ya volvió al método anterior, y al mes siguiente el informe de impacto es un párrafo en una presentación. El evento se mide por asistencia; el cambio se mide por uso sostenido.',
        en: 'The corporate AI workshop has a known survival problem: on Monday everyone tries the tool, by Friday half have returned to their old method, and a month later the impact report is one paragraph in a presentation. Events are measured by attendance; change by sustained use.',
      },
      {
        es: 'Primera condición: el taller parte de una tarea real del equipo, no de un temario general. Diseñar la sesión sobre los correos, informes o tickets que los asistentes procesaron esa semana produce transferencia inmediata. Un temario genérico produce entusiasmo que no encuentra dónde instalarse.',
        en: 'Condition one: the workshop starts from the team real task, not a generic syllabus. Designing the session around the emails, reports or tickets attendees processed that week produces immediate transfer. A generic syllabus produces enthusiasm with nowhere to live.',
      },
      {
        es: 'Segunda condición: cada asistente sale con una automatización propia funcionando, aunque sea estrecha. El salto cognitivo entre "vi una demo" y "esto lo hice yo y sigue corriendo" es enorme, y solo se da si la sesión reserva tiempo real para construir, no solo para mirar.',
        en: 'Condition two: every attendee leaves with their own narrow automation running. The cognitive jump between seeing a demo and having made something still running is enormous, and it only happens if the session reserves real build time rather than watch time.',
      },
      {
        es: 'Tercera condición: el manager define el caso de éxito antes de empezar. Sin su criterio explícito — qué proceso mejora, cuánto tiempo se recupera, quién decide si basta — el taller se convierte en exploración bonita. Con él, cada ejercicio apunta a una cifra que alguien va a revisar.',
        en: 'Condition three: the manager defines the success case beforehand. Without their explicit criterion — which process improves, how much time is recovered, who decides if it is enough — the workshop becomes pleasant exploration. With it, every exercise aims at a figure someone will review.',
      },
      {
        es: 'Cuarta condición: un ritual de seguimiento a treinta días. Una sesión breve donde cada persona muestra qué sigue vivo de lo construido y qué abandonó, y por qué. Ese ritual convierte la experiencia individual en conocimiento del equipo, y expone los obstáculos mientras todavía tienen arreglo.',
        en: 'Condition four: a thirty-day follow-up ritual. A short session where each person shows what from their build is still alive and what they dropped, and why. That ritual turns individual experience into team knowledge, and surfaces obstacles while they are still fixable.',
      },
      {
        es: 'Quinta condición: plantillas compartidas. Lo que una persona construye en el taller debe quedar en un lugar común con instrucciones de uso, límites y un contacto concreto para dudas. Sin plantillas, cada hábito nace en un archivo personal que muere con el portátil.',
        en: 'Condition five: shared templates. What one person builds in the workshop must land in a common place with usage instructions, limits and a named contact for doubts. Without templates every habit lives in a personal file that dies with the laptop.',
      },
      {
        es: 'Ninguna de estas condiciones requiere más presupuesto; requieren más intención. El taller es el 20 % del trabajo de adopción; el otro 80 % es lo que ocurre en los días en los que nadie está mirando el calendario.',
        en: 'None of these conditions needs more budget; they need more intention. The workshop is twenty percent of adoption work; the other eighty percent happens in the days nobody is watching the calendar.',
      },
      {
        es: 'Si organizas uno este trimestre, programa ya la sesión de los treinta días antes de confirmar la fecha del taller. Lo que se planifica de salida como seguimiento, sobrevive; lo que se promete al final de la sesión, casi nunca.',
        en: 'If you are running one this quarter, schedule the thirty-day session before confirming the workshop date. What is planned upfront as follow-up survives; what gets promised at the end of the session almost never does.',
      },
    ],
    category: 'Comunidad',
    date: '2025-08-26',
    readMinutes: 7,
    author: 'Javier Peña',
  },
];
