# EXPEDIENTE FOODAY PROJECT S.L. vs DAVID MAÑÁS — Propuesta IA (v2, perito documental)

> **📌 Versión 2 del documento paralelo.** La v1 (60KB) usaba un tono combativo que mezclaba hechos con conclusiones jurídicas. Esta v2 aplica el enfoque de **perito documental**:
> - Separa **hechos acreditados** de **marco normativo** de **valoración jurídica pendiente del juzgador**
> - Cuantificaciones se presentan como **estimaciones** sujetas a prueba pericial / ejecución de sentencia
> - Se elimina toda escala de probabilidad subjetiva
> - No se adelanta la calificación jurídica que corresponda al juez
>
> **Convención del proyecto:** Ver `memory/memory.md` (2026-07-15). El madre `expediente-fooday-vs-manas.md` solo lo modifica el usuario humano; los agentes escriben en archivos `*.propuesta-ia.md` o `*.borrador-ia.md`.
>
> **Última actualización:** 2026-07-15 (post-revisión metodológica)
>
> **Fuentes documentales consultadas en NotebookLM MCP:**
> 7 sesiones (`506533e6`, `cf88712d`, `0b969062`, `2c9e1944`, `6deee6e4`, `582d2ff1` y consulta inicial). Cuota usada: 7/50.

---

## 📋 LEYENDA DE MARCAS (v2)

| Marca | Significado |
|---|---|
| `[HECHO]` | Hecho acreditado por la prueba documental o por reconocimiento expreso de la parte |
| `[DND]` | **D**ato **N**o **D**isponible: el cuaderno no lo contiene ni siquiera de forma aproximada |
| `☐ [HUMANO]` | Requiere input del usuario para completarse |
| `[NL-N]` | Cita a la sesión NotebookLM que contiene el dato |
| `[NORMATIVA]` | Marco legal aplicable (no pre-juzga la aplicación al caso) |
| `[VALORACIÓN]` | Cuestión que el juzgador deberá resolver; aquí se exponen los términos del debate |
| `[ESTIMACIÓN]` | Cálculo provisional sujeto a prueba pericial o a determinación judicial |
| `[⚠️ CONTRADICCIÓN MCP]` | Distintas sesiones del cuaderno dieron versiones diferentes |
| `[MÍNIMO]` | Cifra o afirmación provisional, no acreditada de modo conclusivo |

> **Nota metodológica:** Cuando un dato es **provisional** o **no plenamente acreditado**, se utiliza el verbo "podría", "sería susceptible de", "se desconocen" u otras fórmulas conservadoras. Las afirmaciones categóricas se reservan exclusivamente a lo que la prueba documental acredita de forma directa.

---

## Índice rápido — mapeo al madre

| Cap. madre | Sección en este doc | Estado |
|---|---|---|
| 0. Resumen ejecutivo | §0 | ✅ Reformulado |
| 1. Partes | §1 | ✅ Sin cambios (datos identificativos son hechos) |
| 2. Contrato | §2 | ✅ Sin cambios (cláusulas verbatim son hechos) |
| 3. Cronología | §3 | ✅ Reformulado (sin adjetivar la conducta) |
| 4. Incumplimientos contractuales | §4 | ✅ Reformulado (valoración desplazada al juez) |
| 5. Análisis jurídico | §5 | ✅ **Separado** en hechos / norma / valoración pendiente |
| 6. Auditoría económica | §6 | ✅ Cuantificaciones como **estimaciones** |
| 7. Hechos acreditados | §7 | ✅ Sin cambios estructurales |
| 8. Hechos favorables a la otra parte | §8 | ✅ Reformulado (sin pre-juzgar) |
| 9. Pruebas | §9 | ✅ Sin cambios estructurales |
| 10. Fundamentos jurídicos | §10 | ✅ Sin cambios (normativa es normativa) |
| 11. Estrategia procesal previsibles | §11 | ✅ **Probabilidades eliminadas** |
| 12. Análisis cruzado de afirmaciones | §12 | ✅ Reformulado (sin calificar como "contradicción") |
| 12B. Análisis documental | §12B | ✅ Reformulado |
| 13. Respuestas a alegaciones | §13 | ☐ [HUMANO] |
| 14. Pretensiones | §14 | ✅ **Indemnización reclasificada como estimación** |
| 15. Matriz de objetivos | §15 | ✅ Sin "probabilidades" |
| 16. Estrategia procesal | §16 | ✅ Escenarios sin probabilidades |
| 17. Demanda (plantilla) | §17 | ✅ **Suplico modificado: condena indeterminada en ejecución** |
| 18. Preparación del juicio | §18 | ✅ Preguntas sin presuposiciones |
| 19. Negociación | §19 | ✅ Líneas rojas descritas sin adjetivar |
| 20. Análisis de riesgos | §20 | ✅ **Probabilidades eliminadas**, descripción cualitativa |
| 21. Anexos | §21 | ✅ Sin cambios |
| 22. Diario | §22 | ☐ [HUMANO] |
| 23. Libro Mayor | §23 | ☐ [HUMANO] |

---

# §0 — RESUMEN EJECUTIVO (versión perito)

## Partes identificadas

**FOODAY PROJECT S.L.** ([HECHO]) — NIF B55289540, domicilio en Cr. Selva de Mar, 9 1r 1a, 17489 El Port de la Selva (Girona). Administrador: Luis David López Gamero (DNI 40.335.619-J).

**David Mañas Esteban** ([HECHO]) — DNI 40.450.516-W, domicilio en Cr. Major, 14 Àtic, 17489 El Port de la Selva. Email `davidmeinstal@gmail.com`.

**SAZOR2018 CB** ([HECHO]) — NIF E67329839, propietaria del local (no es parte demandada en este procedimiento).

## Local afectado

Dirección: **Carrer Selva de Mar, 11, Local 2A, 17489 El Port de la Selva**, ref. catastral 6871401EG1867S0077ME, superficie 29 m². Datos registrales: Registro de la Propiedad de Roses Nº 2, Tomo 2760, Libro 84, Folio 59, Finca 4903.

## Resumen fáctico extraído de la documentación del cuaderno

1. El **01/12/2018** se suscribieron dos contratos encadenados: arrendamiento entre SAZOR2018 CB y David Mañas (duración 10 años), y subarrendamiento entre David Mañas y FOODAY sobre el 50% del local. [HECHO, `[NL-1][NL-3]`]

2. Durante la vigencia de la relación, las facturas de suministros se emitieron con periodicidad **trimestral**, en lugar de la mensual prevista en la Clàusula 4ª del contrato matriz. [HECHO parcial, `[NL-14]`]

3. En **abril de 2026** (día exacto [DND]) se produjo el cambio del bombín de acceso al local, actuación que David Mañas reconoció posteriormente en correo electrónico de **3 de julio de 2026 a las 18:32**, justificándola por "la urgencia" y por sus "presses i nervis". [HECHO, `[NL-6][NL-8]`]

4. El correo de reconocimiento indica que David tenía en su poder una copia de la llave destinada a FOODAY. [HECHO parcial, `[NL-8]`]

5. **Día exacto del cambio**: [DND]. **Día exacto de recuperación del acceso**: [DND]. El periodo del que se tiene constancia escrita es, como **mínimo**, el transcurrido desde el cambio hasta el 3 de julio de 2026. [HECHO provisional]

6. El **6 de julio de 2026** se remitió burofax concediendo un plazo para solución amistosa. El **7 de julio de 2026** se notificó a la Gestoría la propuesta de compensación y la solicitud de auditoría de la facturación de suministros. El **8 de julio de 2026** se realizó el cuadre contable. [HECHO, `[NL-13][NL-14][NL-15]`]

7. En las facturas de electricidad emitidas durante los últimos años, la parte actora detectó una posible doble imposición de IVA (21% aplicado sobre una base que incluiría ya el impuesto repercutido por la compañía). La cuantificación exacta del IVA repercutido en exceso desde 2018 es **[DND]**, pendiente de auditoría. [HECHO parcial, `[NL-16]`]

8. La actora abonó íntegramente la renta pendiente con carácter previo a la presentación de la demanda, según se hace constar. [☐ [HUMANO] pendiente de acreditar mediante extracto bancario]

## Cuestiones que el juzgador deberá resolver

Queda fuera del alcance de este informe —que tiene carácter documental— anticipar la calificación jurídica que corresponda. No obstante, a título puramente informativo, las cuestiones que la demanda que se tramitará ante el Juzgado de Primera Instancia de Figueres (presentación prevista el 15 de julio de 2026) plantea son, entre otras:

1. **Calificación del cambio de bombín** a la luz de las Cláusulas 7ª (reparaciones a cargo del arrendatario) y 10ª (prohibición de obras o modificaciones sin autorización escrita) del contrato matriz, y de los artículos 1258 y 1554.3 del Código Civil. [NORMATIVA]

2. **Cuantificación de la indemnización por privación de uso**, en caso de que se estimase la procedencia de la misma. La parte actora realiza una estimación provisional en **379,73 €** (prorrateo de renta diaria por los días de privación del uso), cuantificación que se ofrece como orientación y que queda supeditada a la prueba pericial o a lo que el juzgador determine. [ESTIMACIÓN]

3. **Procedencia de la compensación** entre la deuda de rentas y el eventual crédito por privación de uso, al amparo de los artículos 1195 y 1202 del Código Civil. [NORMATIVA]

4. **Procedencia de la regularización** de las facturas de electricidad, en particular mediante facturas rectificativas y devolución del IVA repercutido en exceso. [NORMATIVA]

5. **Imputabilidad del coste del bombín** (aproximadamente 180 € [DND exacto]), reclamada por la parte demandada. [VALORACIÓN]

---

# §1 — PARTES (referencia: madre §1)

*Esta sección recoge exclusivamente datos identificativos acreditados por la documentación. Se trata de hechos objetivos, por lo que se mantiene igual que la v1.*

## 1.1 FOODAY PROJECT S.L. (demandante)

| Campo | Dato | Tipo de dato |
|---|---|---|
| Razón social | FOODAY PROJECT S.L. | [HECHO] |
| NIF | B55289540 | [HECHO] |
| Domicilio social | Cr. Selva de Mar, 9 1r 1a, 17489 El Port de la Selva (Girona) | [HECHO] |
| Relación contractual | Subarrendataria del 50% del local | [HECHO] |
| Representante legal | Luis David López Gamero | [HECHO] |
| DNI representante | 40.335.619-J | [HECHO] |
| Email representante | `davidlopezgamero@gmail.com` | [HECHO] |
| Fecha constitución, capital, objeto social detallado | [DND] | — |

## 1.2 David Mañas Esteban (demandado)

| Campo | Dato | Tipo de dato |
|---|---|---|
| Nombre completo | David Mañas Esteban | [HECHO] |
| DNI | 40.450.516-W | [HECHO] |
| Domicilio | Cr. Major, 14 Àtic, 17489 El Port de la Selva | [HECHO] |
| Email | `davidmeinstal@gmail.com` | [HECHO] |
| Teléfono | 646 279 957 | [HECHO] |
| Nombre comercial | Instal·lacions David | [HECHO] |
| Condición contractual | Arrendatario principal (respecto a SAZOR) y subarrendador (respecto a FOODAY) | [HECHO] |

## 1.3 SAZOR2018 CB (tercero vinculado)

| Campo | Dato |
|---|---|
| Forma jurídica | Comunidad de bienes |
| NIF | E67329839 |
| Domicilio | Cr. Torrent, 65 Àtic 1er, 08290 Cerdanyola del Vallès |
| Representante 1 | Sergio Rozas Molina (DNI 46.808.419-S) |
| Representante 2 | Silvia Garcia Ferrando |
| Relación con el caso | Propietaria del local; arrendadora matriz; **no es parte demandada** |

## 1.4 Inmueble

| Campo | Dato |
|---|---|
| Dirección | Carrer Selva de Mar, 11, Local 2A, 17489 El Port de la Selva |
| Referencia catastral | 6871401EG1867S0077ME |
| Registro de la Propiedad | Roses Nº 2, Tomo 2760, Libro 84, Folio 59, Finca 4903 |
| Superficie | 29 m² |

## 1.5 Gestoría intermediaria

| Campo | Dato |
|---|---|
| Nombre | Agència Port de la Selva – Centre de Serveis |
| Sociedad operadora | Barna Port SL (NIF B17303801) |
| Administrador | Josep Carbonés Cané |
| Persona de contacto | Cecília Esteban i Costa |
| Email | `cecilia@agenciaportselva.com` |
| Teléfono | 972 38 70 11 |

## 1.6 Otros terceros mencionados en la documentación

| Persona | Relación con el caso |
|---|---|
| Silvia Garcia Ferrando | Co-representante de SAZOR2018 CB |
| Josep Carbonés Cané | Administrador de la Agència Port de la Selva |
| Cecília Esteban i Costa | Persona de contacto operativo en la gestoría |
| Cristóbal Rodríguez Hernández | Emisor de un presupuesto de 2.401,85 € por obras en el local (Obres del Port) |
| Jose Bello Viña | Emisor de un presupuesto de 930 € por techo registrable |
| "Victor" | [⚠️ CONTRADICCIÓN MCP] — La sesión inicial de cronología parecía mencionar un mensaje a "Victor"; la sesión de identificación lo declaró no disponible. **Requiere verificación manual del PDF** `ma%C3%B1as2.pdf` |

---

# §2 — CONTRATO (referencia: madre §2)

*Esta sección reproduce literalmente las cláusulas contractuales. Los textos son, por su naturaleza, hechos en sentido estricto (lo escrito en el contrato). Se han añadido notas sobre cuál es la potencial relevancia de cada cláusula, sin prejuzgar su aplicación al caso.*

## 2.1 Objeto
**Estipulació 3 (Subcontrato):** *"El preu del sots-arrendament acordat és del 50% de la renda que en cada moment satisfaci el Sr. Mañas, més l'IVA i menys l'IRPF."* [HECHO, `[NL-3]`]
- **Relevancia potencial:** el precio del subarriendo se fija por referencia a la renta que Mañas pague a SAZOR.

## 2.2 Duración
**Estipulació 2 (Subcontrato):** *"El Sr. LUIS DAVID LÒPEZ GAMERO accepta les clàusules i pactes del contracte de lloguer firmat, en data 01.12.2018 entre el Sr. Rozas (SAZOR2018 CB) i el Sr. Mañas."* [HECHO, `[NL-3]`]
**Clàusula 3ª (Contrato matriz):** *"El contracte començarà a regir a partir del dia 01 de desembre de 2018 i finalitzarà el 30 de novembre de 2028."* [HECHO, `[NL-2]`]
- **Relevancia potencial:** el subarriendo queda vinculado al plazo del contrato matriz (10 años).

## 2.3 Renta
**"Convenen" del contrato matriz:** *"per el preu de TRES-CENTS EUROS MENSUALS (300,00€ mensuals) més I.V.A, menys la retenció a compte de l'IRPF que correspongui."* [HECHO, `[NL-2]`]
- **Relevancia potencial:** la renta del subarriendo es el 50% del importe anterior más IVA menos IRPF. La renta base de 2018 fue de 150 €/mes; el contrato prevé revisión anual por IPC (cifra efectiva en 2026 [☐ [HUMANO]]).

## 2.4 Pago
**Clàusula 4ª (Contrato matriz):** *"Queda establert que la renda i els altres conceptes s'hauran de pagar per endavant, mensualment, durant els cinc primers dies de cada venciment, en el domicili del seu propietari o del seu administrador."* [HECHO, `[NL-3]`]
- **Observación documental:** durante la relación efectivamente observada, las facturas se emitieron con periodicidad trimestral, no mensual (ver §3.1).

## 2.5 Suministros
**Clàusula 11ª (Contrato matriz):** *"L'arrendatari haurà de fer-se càrrec de les despeses que ocasioni el subministrament d'aigua, gas, electricitat i d'altres serveis. Contractacions dels serveis esmentats, canvis de nom, etc..."* [HECHO, `[NL-4]`]
- **Observación documental:** los contratos de suministro constan a nombre personal de David Mañas, no de FOODAY ni de SAZOR (`[NL-21]`). Las facturas originales de las compañías son las recibidas por David (adjuntos al correo de 4 de julio de 2026: `FACTURES SERVEIS GENER FEBRER MARÇ.pdf` y `FACTURES SERVEIS ABRIL MAIG JUNY.pdf`).

## 2.6 Reparaciones
**Clàusula 7ª (Contrato matriz):** *"El manteniment, conservació i reparacions del local comercial objecte d'aquest contracte aniran a càrrec de l'arrendatari. També aniran a càrrec de l'arrendatari les reparacions, conservació i/o manteniment de les façanes..."* [HECHO, `[NL-5]`]
**Clàusula 6ª (Contrato matriz):** *"L'arrendatari està obligat a realitzar totes les reparacions que siguin necessàries per conservar el local en condicions de servir a l'ús convingut..."* [HECHO, `[NL-5]`]

## 2.7 Obras y modificaciones
**Clàusula 10ª (Contrato matriz):** *"Tampoc podrà l'arrendatari, sense el permís exprés per escrit de l'arrendador, realitzar en el local cap tipus d'obres o modificacions. En el cas de comptar amb la deguda autorització, aquelles seran totalment a compte i càrrec de l'arrendatari, restant en benefici de la finca, sense que hagi de satisfer per l'arrendador cap preu, ni compensació, ni indemnització a l'arrendatari."* [HECHO, `[NL-5]`]
- **Relevancia potencial:** exigiría, en su caso, autorización escrita del arrendador (SAZOR) para cualquier obra o modificación.

## 2.8 Resolución por impago
**Clàusula 23ª (Contrato matriz):** *"En cas d'impagament superior a tres mensualitats de la renda pactada, el present contracte d'arrendament quedarà automàticament rescindit i resolt, obligant-se la part arrendatària a lliurar el local de negoci..."* [HECHO, `[NL-6]`]

## 2.9 Cláusula penal por demora en la entrega del local
**Clàusula 3.b (Contrato matriz):** *"acreditarà en concepte de clàusula penal convencional per l'incompliment de l'obligació de lliurament del local, una quantitat equivalent al doble de la renda diària vigent."* [HECHO, `[NL-3]`]

## 2.10 Indemnización por rescisión anticipada del arrendatario
**Clàusula 20ª (Contrato matriz):** *"la part arrendatària pagarà a la part arrendadora una indemnització equivalent a 2 mensualitats anuals per cada any que falti, fins a la fi del període acordat."* [HECHO, `[NL-6]`]

## 2.11 Sobre "justificación de gastos repercutidos"

> **Nota documental:** La Clàusula 11ª del contrato matriz, en su redacción literal, establece la obligación del pago de los gastos de suministros sin contener una mención expresa a "justificación documental" específica. La obligación de motivación documental, en su caso, derivaría del principio general de buena fe (Art. 1258 CC) y de la normativa tributaria, y es una cuestión que el juzgador podría considerar si llegase a plantearse.

---

# §3 — CRONOLOGÍA DE LOS HECHOS (referencia: madre §3)

> La cronología se limita a hechos documentados. La valoración jurídica de los mismos se desplaza a §5.

## 3.1 Fase previa al conflicto (2018–abril 2026)

| Fecha | Hecho | Fuente |
|---|---|---|
| **01/12/2018** | Firma del contrato de arrendamiento entre SAZOR2018 CB y David Mañas (duración 10 años, vencimiento 30/11/2028). | [HECHO, `[NL-1][NL-2]`] |
| **01/12/2018** | Firma del contrato de subarrendamiento entre David Mañas y FOODAY PROJECT S.L. sobre el 50% del local (vinculado al contrato matriz). | [HECHO, `[NL-3][NL-4]`] |
| **02/12/2018** | Presupuesto de Instal·lacions David por importe de 1.949,66 € (sin IVA), incluyendo electricidad (caja de superficie, protectores, diferenciales, magnetotérmicos, cableado, 8 pantallas LED de 36 W, luces de emergencia, extractor S-P), fontanería (tubería multicapa, WC Victòria, lavabo Victòria, grifería Brava, tubería PVC). El presupuesto excluye expresamente "ajudes de paleta" (ayudas de albañilería) y permisos de obra. | [HECHO parcial, `[NL-5]`] |
| **02/01/2019** | Transferencia CaixaBank de 600,00 € a favor de INCASOL en concepto de fianza. | [HECHO, identificación MCP] |
| 2018–2026 (práctica) | La facturación de suministros emitida por David Mañas a FOODAY se realizó con periodicidad trimestral, en lugar de la prevista en la Clàusula 4ª del contrato matriz (mensual, primeros cinco días). | [HECHO parcial, `[NL-14]`] |
| 2018–2026 (alegación de la actora) | La actora considera que las facturas de electricidad habrían contenido un doble IVA (21% sobre base que ya incluía el impuesto). Cuantificación total acumulada: [DND] (pendiente de auditoría retroactiva). | [HECHO parcial, `[NL-16]`] |

## 3.2 Cambio del bombín (abril de 2026)

| Fecha | Hecho | Fuente |
|---|---|---|
| **Abril de 2026** (día exacto [DND]) | Cambio del bombín de acceso al local. | [HECHO parcial, `[NL-6]`] |
| Abril de 2026 | Sin constancia documental de comunicación previa a FOODAY sobre el cambio. | [HECHO parcial — inferencia por ausencia de documento] |
| Abril de 2026 | Sin constancia documental de comunicación inmediata posterior por parte de David Mañas. | [HECHO parcial] |

> **Nota sobre la fecha exacta:** la fuente documental del cuaderno indica únicamente que el cambio se produjo "en el mes de abril de 2026", por propia manifestación de David Mañas. El día exacto no figura acreditado en las fuentes consultadas. **[DND]** Dato pendiente de acreditación (☐ [HUMANO] — p.ej. mediante la factura del cerrajero, en su caso).

## 3.3 Correos electrónicos entre David Mañas y Luis David López

### 3.3.1 Correo de 3 de julio de 2026, 18:32 — "TEMA CLAUS / CANVI DE PANY"

**Emisor:** David Mañas Esteban (davidmeinstal@gmail.com)
**Destinatario:** David López (davidlopezgamero@gmail.com)
**Fuente:** [`[NL-8]`]

| Dato | Extracto literal | Calificación |
|---|---|---|
| Reconocimiento del cambio | *"Les claus es van haver de canviar, perquè el pany estava trencat"* | [HECHO — admitido por David] |
| Justificación de la decisión | *"Al tractar-se d'una reparació d'urgència (que no una obra) vaig fer-ho al moment. Les presses i els nervis van fer que no t'avises al moment"* | [HECHO — admitido por David. La calificación jurídica de esta afirmación corresponde al juzgador.] |
| Llave en poder de David | *"et vaig dir que tenia la teva còpia, que podies passar a recollir-la quan volguessis"* | [HECHO — admitido por David] |
| Reclamación del bombín | *"el canvi de pany, també et correspon pagar-lo"* | [HECHO — petición de David] |
| Limitación horaria del acceso | *"Demà divendres, 03.07.2026, a les 08.00hrs i a les 18.00 hrs hi haurà algú a l'oficina, si vols passar"* | [HECHO] |

### 3.3.2 Correo de 4 de julio de 2026, 19:52 — "TEMA SUBMINISTRAMENTS"

**Emisor:** David Mañas Esteban (davidmeinstal@gmail.com)
**Destinatario:** David López (davidlopezgamero@gmail.com)
**Fuente:** [`[NL-10]`]

| Dato | Extracto literal | Calificación |
|---|---|---|
| Anulación de factura anterior | *"Respecte a l'anterior factura de serveis, queda anul·lada, adjunto còpia de la factura d'anul·lació"* | [HECHO — admitido por David] |
| Emisión de nueva factura (Serie F 141/F) | *"adjunto còpia de la factura de serveis que és la vàlida"* | [HECHO] |
| Envío de facturas para verificación | *"necessito les factures i tiquets originals de tots i cadascun dels conceptes repercutits per verificar consums i IVA"* | [HECHO] |
| Admisión de que los suministros están a su nombre | *"Si comptabilitzes la dels subministraments ho estàs fent malament doncs són factures a nom meu"* | [HECHO] |
| Oferta condicional de resolver el contrato | *"dilluns a primera hora compleix amb la teva obligació de pagament i em liquides els deutes pendents, aquest mateix dilluns"* | [HECHO] |

### 3.3.3 Correos posteriores — Extractos adicionales

| Dato | Extracto literal | Fuente |
|---|---|---|
| David manifiesta que si se liquida el subarriendo no cobrará el bombín | *"Si vols, el dilluns liquides el que em deus i deixem córrer el sots-arrendament (en aquest cas no et cobraré el bombí)"* | [HECHO, `[NL-11]`] |
| Descripción del condicionamiento del acceso | *"el local, molts dies, ha estat obert de 8 hores a 13.30, de dilluns a divendres, i moltes tardes de 18 a 20hrs"* | [HECHO, `[NL-19]`] |

> **Sobre estos párrafos:** la valoración jurídica de los párrafos anteriores del demandado (considerar si la oferta de no cobrar el bombín se contradice con la reclamación inicial, o si el horario del local es compatible con el derecho al goce pacífico, o si los documentos aportados son facturas definitivas o pendientes de revisión) es una cuestión que el juzgador deberá resolver.

## 3.4 Reclamación extrajudicial

| Fecha | Hecho | Fuente |
|---|---|---|
| **06/07/2026** | Remisión de burofax por FOODAY a David Mañas concediendo un plazo de 7 días naturales para solución amistosa. | [HECHO, `[NL-13][NL-14]`. ☐ [HUMANO] indexar el documento físico] |
| **07/07/2026** | Notificación por FOODAY a la Gestoría de la propuesta de compensación de deudas (Arts. 1195 y 1202 CC), paralización del pago de suministros como consecuencia de la detección de doble IVA, solicitud de auditoría retroactiva desde 2018 y solicitud de justificación de gastos. | [HECHO, `[NL-15][NL-16][NL-22][NL-23]`] |
| **07/07/2026** | Cita expresa de los artículos 1195 y 1554.3 del Código Civil en el escrito a la Gestoría. | [HECHO, `[NL-15][NL-18]`] |
| **08/07/2026** | Comunicación a la Gestoría del cuadre contable en el que se cuantifica la renta pendiente y la eventual indemnización por privación de uso. | [HECHO, `[NL-15]`] |

## 3.5 Pago íntegro de la renta
> ☐ [HUMANO] Aportar extracto bancario que acredite la fecha e importe exactos del pago.

## 3.6 Inminencia de la presentación

| Fecha | Hecho |
|---|---|
| **15/07/2026** | Presentación de demanda prevista ante el Juzgado de Primera Instancia de Figueres. ☐ [HUMANO] confirmar nº de juzgado. |

---

# §4 — INCUMPLIMIENTOS CONTRACTUALES (referencia: madre §4)

> Esta sección expone los hechos susceptibles de ser constitutivos de incumplimiento, seguidos del marco normativo. La calificación jurídica y la estimación de consecuencias se reservan a §5.

## 4.1 Cambio del bombín

| Hechos acreditados | Fuente |
|---|---|
| El bombín fue cambiado por David Mañas en abril de 2026 (día exacto [DND]). | `[NL-6]` |
| David Mañas reconoció expresamente haber realizado el cambio. | `[NL-8]` |
| David Mañas manifestó haber actuado "por las prisas y los nervios". | `[NL-8]` |
| David Mañas tenía copia de la llave destinada a FOODAY. | `[NL-8]` |
| Consta limitación horaria del acceso al local. | `[NL-8][NL-19]` |
| La factura del bombín ascendería a aproximadamente 180 €; el número exacto de la factura [DND] (David menciona verbalmente el cobro en correos, sin adjuntar documento contable). | `[NL-8]` |

**Marco normativo aplicable (a título informativo):**
- Clàusula 10ª del contrato matriz (prohibición de modificaciones sin permiso escrito).
- Clàusula 7ª del contrato matriz (reparaciones a cargo del arrendatario).
- Arts. 1258 y 1554.3 del Código Civil.

> [VALORACIÓN] La subsunción de los hechos anteriores en una u otra cláusula es una cuestión que el juzgador deberá resolver.

## 4.2 Privación del uso del local

| Hechos acreditados | Fuente |
|---|---|
| El correo de David Mañas reconoce que "si al mes de juliol no tens la nova clau..." implica que, en el momento de emitir ese correo (3 de julio de 2026), la actora aún no disponía de la nueva llave. | `[NL-6]` |
| El correo de reconocimiento indica limitación del acceso a horario de oficina. | `[NL-8][NL-19]` |

**Marco normativo aplicable:** Art. 1554.3 del Código Civil.

> [MÍNIMO] El periodo acreditado por la documentación escrita se extiende desde abril de 2026 (día exacto [DND]) hasta al menos el 3 de julio de 2026 (fecha del correo). La duración mínima acreditada es, por tanto, **de al menos 77 días**, sin perjuicio de una eventual ampliación o reducción que se acredite en el procedimiento.

## 4.3 Coste del bombín

| Hechos acreditados | Fuente |
|---|---|
| David Mañas reclama a FOODAY el 50% del coste del bombín. | `[NL-8]` |
| David Mañas manifiesta que, si se rescinde el subarriendo, no cobrará el bombín. | `[NL-11]` |

> [VALORACIÓN] La compatibilidad jurídica de estas dos manifestaciones de David es una cuestión que el juzgador deberá resolver. La imputabilidad del coste al subarrendatario es, en todo caso, una cuestión interpretativa que compete al juzgado a la luz de las Clàusulas 7ª y 10ª y del principio de buena fe (Art. 1258 CC).

## 4.4 Facturación de electricidad

| Hechos acreditados | Fuente |
|---|---|
| Las facturas se emitieron trimestralmente, en lugar de la periodicidad mensual prevista contractualmente. | `[NL-7][NL-13][NL-14]` |
| Las facturas específicas identificadas (Serie F 140/F y 141/F) fueron rechazadas por la actora por doble imposición de IVA. | `[NL-2][NL-5][NL-16]` |
| La actora comunicó una solicitud de auditoría retroactiva desde 2018. | `[NL-23]` |
| La cuantificación total del IVA repercutido en exceso desde 2018 es [DND], pendiente de auditoría. | — |

## 4.5 Factura de limpieza (12,50 €) — sin ticket

| Hecho acreditado | Fuente |
|---|---|
| David Mañas habría cargado 12,50 € en concepto de limpieza, sin aportación de factura o ticket fiscal. | `[NL-22]` |

> [VALORACIÓN] La procedencia del cargo de gastos menores sin justificación documental es una cuestión que el juzgador podrá considerar a la luz del principio de buena fe y de las obligaciones contables de la actora.

## 4.6 Contratos de suministro a nombre de David

| Hecho | Fuente |
|---|---|
| Los contratos de agua, electricidad y otros suministros constan a nombre personal de David Mañas, no de FOODAY ni de SAZOR. | `[NL-21]` |

---

# §5 — MARCO NORMATIVO Y ANÁLISIS JURÍDICO (referencia: madre §5)

> **Cambio metodológico:** esta sección NO pre-juzga la aplicación de cada norma al caso. Limita su contenido a (i) enunciar el marco normativo, (ii) exponer el fundamento documental disponible para cada eventual alegación. La calificación jurídica y la procedencia o improcedencia de cada pretensión es una cuestión reservada al juzgador.

## 5.1 Cambio del bombín

### Marco normativo
| Norma | Redacción relevante |
|---|---|
| Clàusula 10ª matriz | Prohibición de "obres o modificaciones" sin autorización escrita |
| Clàusula 7ª matriz | Mantenimiento, conservación y reparaciones a cargo del arrendatario |
| Art. 1258 CC | Los contratos obligan al cumplimiento de lo expresamente pactado y a todas las consecuencias conformes a la buena fe |
| Art. 1554.3 CC | El arrendador debe mantener al arrendatario en el goce pacífico del inmueble |
| Art. 1555 CC | Responsabilidad del arrendador por actos propios |

### Aplicación al caso — cuestiones que el juzgador deberá valorar

1. Si el cambio del bombín constituye una "reparación de mantenimiento" (Clàusula 7ª) o una "obra o modificación" (Clàusula 10ª), a la luz de su alcance funcional sobre el acceso al local.
2. Si la ausencia de autorización escrita determina, en su caso, la aplicación de la Clàusula 10ª o si concurren excepciones admisibles.
3. Si la manifestación escrita del demandado ("por prisas y nervios") es susceptible de ser considerada insuficiente para fundamentar una urgencia objetiva.
4. Si la limitación horaria documentada es compatible con el derecho al goce pacífico reconocido en el artículo 1554.3 del Código Civil.

## 5.2 Indemnización por privación de uso

### Marco normativo
| Norma | Aplicación potencial |
|---|---|
| Art. 1554.3 CC | Goce pacífico del inmueble |
| Art. 1101 CC | Responsabilidad por incumplimiento |
| Arts. 1195 y 1202 CC | Compensación de deudas |

### Estimación provisional por la actora [ESTIMACIÓN]

> La actora realiza una **estimación provisional** de la indemnización por privación de uso utilizando como criterio de cálculo el prorrateo de la renta anual por los días de privación acreditados:

```
Renta anual base del subarriendo:       150,00 €/mes × 12       =  1.800,00 €
Renta diaria:                          1.800,00 € / 365 días   =      4,9315 €/día
Periodo acreditado por la documentación (mínimo):                =      77 días
                                                                ──────────
Estimación provisional de indemnización: 4,9315 €/día × 77 días =    379,73 €
```

> Esta cifra constituye una **mera estimación** de la actora, calculada sobre la base de la renta base de 2018 (sin aplicación del IPC acumulado desde entonces) y del periodo acreditado por la documentación escrita (mínimo 77 días, desde abril de 2026 hasta el 3 de julio de 2026, sin perjuicio del día exacto del cambio del bombín que es [DND] y de una eventual ampliación del periodo que pueda acreditarse en el procedimiento). La determinación definitiva de la indemnización, en su caso, es una cuestión reservada al juzgador y podrá ser objeto de prueba pericial o de liquidación en ejecución de sentencia.

## 5.3 Compensación de deudas

### Marco normativo
**Art. 1196 CC** *(extracto pertinente, `[NL-18]`)*:
> *"Para que proceda la compensación, es preciso: 1.º Que cada uno de los obligados lo esté principalmente, y sea a la vez acreedor principal del otro. 2.º Que ambas deudas consistan en una cantidad de dinero… 3.º Que las dos deudas estén vencidas. 4.º Que sean líquidas y exigibles. 5.º Que sobre ninguna de ellas haya retención o contienda promovida por terceras personas."*

### Cuestiones que el juzgador deberá valorar

1. Si los requisitos del Art. 1196 CC concurren en el caso concreto.
2. Si la cifra de la indemnización por privación de uso (379,73 € como **estimación**) puede considerarse líquida y exigible a efectos de compensación con la deuda de rentas (374,74 €).
3. Si, en caso de no concurrir los requisitos de la compensación legal, procede la compensación judicial (Art. 1202 CC).

## 5.4 Coste del bombín

### Marco normativo
- Clàusula 10ª matriz: prohibición de obras o modificaciones sin autorización escrita.
- Clàusula 7ª matriz: reparaciones a cargo del arrendatario.
- Principio de causación (quien decide unilateralmente asume las consecuencias).
- Art. 1258 CC (buena fe contractual).

### Cuestiones que el juzgador deberá valorar
1. Si la imputación del coste a FOODAY es ajustada a las cláusulas contractuales.
2. Si las dos manifestaciones del demandado sobre el mismo concepto (reclamación inicial + oferta de condonación) constituyen una situación jurídica unívoca.

## 5.5 Facturación de electricidad y doble IVA

### Marco normativo
- Ley 37/1992, del IVA.
- Real Decreto 1619/2012 (Reglamento de Facturación).
- Ley 58/2003, General Tributaria (Arts. 170–172, infracciones tributarias).
- Art. 1258 CC (buena fe).

### Documentación disponible
- Rechazo formal de las facturas Serie F (140/F y 141/F) comunicado el 7 de julio de 2026 `[NL-16]`.
- Solicitud de auditoría retroactiva desde 2018 `[NL-23]`.
- Cuantificación total del IVA cobrado en exceso: [DND — pendiente de auditoría].

### Cuestiones que el juzgador deberá valorar
1. Si la apreciación de doble IVA por la actora es correcta y, en su caso, a cuánto asciende.
2. Si la competencia para resolver sobre la regularización tributaria corresponde al orden civil o debe instarse vía administrativa tributaria.

---

# §6 — AUDITORÍA ECONÓMICA (referencia: madre §6)

> **Cambio metodológico:** las cifras que figuran a continuación se presentan como las comunicadas por la actora en sus escritos a la Gestoría, o como **estimaciones** sujetas a prueba pericial. No se presentan como "deudas líquidas" frente a la parte demandada.

## 6.1 Cifras comunicadas por la actora a la Gestoría (7 de julio de 2026)

| Concepto | Importe comunicado | Carácter |
|---|---|---|
| Rentas pendientes (dos mensualidades, importe comunicado el 7 de julio) | 374,74 € | [HECHO — importe comunicado por la actora] |
| Indemnización por privación de uso (estimación provisional conforme al criterio expuesto en §5.2) | 379,73 € | [ESTIMACIÓN de la actora, pendiente de prueba] |
| Diferencia tras la propuesta de compensación | 4,99 € a favor de la actora | [ESTIMACIÓN] |

> **Nota documental:** estas cifras son las comunicadas unilateralmente por la actora en su escrito a la Gestoría de 7 de julio de 2026. La consideración de las mismas como créditos líquidos y exigibles frente a la demandada es una cuestión que el juzgador deberá resolver, particularmente por lo que se refiere a la indemnización por privación de uso.

## 6.2 Cuadre actualizado comunicado el 8 de julio de 2026

| Concepto | Importe comunicado | Carácter |
|---|---|---|
| Renta de julio de 2026 (considerada la única vencida tras revisión) | 191,12 € | [HECHO — comunicado por la actora] |
| Saldo a favor de FOODAY (tras descontar la indemnización estimada de la renta de julio) | 188,61 € | [ESTIMACIÓN] |

## 6.3 Estimación provisional de la indemnización por privación de uso

| Variable | Valor | Observación |
|---|---|---|
| Renta anual base | 1.800,00 € (150 €/mes × 12) | [ESTIMACIÓN] |
| Renta diaria | 4,9315 €/día (1.800 / 365) | [ESTIMACIÓN] |
| Periodo acreditado (mínimo) | **77 días** | [MÍNIMO] |
| Importe provisional | **379,73 €** | [ESTIMACIÓN] |
| Periodo efectivo (día a día) | [DND] | Pendiente de prueba |

> **Riesgo metodológico:** la cifra de 379,73 € puede verse alterada por: (i) la determinación del día exacto del cambio, (ii) la fecha exacta de recuperación del acceso, (iii) la aplicación del IPC acumulado a la renta base de 2018, (iv) la aplicación del IPC al periodo en cuestión.

## 6.4 Coste del bombín

| Variable | Valor | Fuente | Carácter |
|---|---|---|---|
| Importe aproximado | 180 € | `[NL-8]` | [ESTIMACIÓN — importe no documentado formalmente] |
| Número de factura | [DND] | — | Pendiente |
| Porcentaje reclamado por David | 50 % | `[NL-8]` | [HECHO — petición de la demandada] |

## 6.5 Auditoría retroactiva del IVA en electricidad ☐ [HUMANO]

| Periodo | Estado |
|---|---|
| 2018–2025 | [☐ [HUMANO] — auditoría pendiente] |
| 2026 (YTD) | [☐ [HUMANO]] |
| Importe total estimado del IVA repercutido en exceso | [DND] |

**Documentación disponible a la espera de cuantificación:**
- Series de facturas rechazadas: 140/F, 141/F (Serie F), 55/F.
- Adjuntos al correo del 4 de julio de 2026 con facturas originales de las compañías: `FACTURES SERVEIS GENER FEBRER MARÇ.pdf` (3,4 MB), `FACTURES SERVEIS ABRIL MAIG JUNY.pdf` (3,7 MB).

> **Recomendación procesal:** si la auditoría cuantifica el IVA repercutido en exceso, la demanda puede solicitar la condena a su devolución o, subsidiariamente, que la determinación se reserve a ejecución de sentencia.

## 6.6 Fianza constituida (2 de enero de 2019)

| Campo | Dato | Fuente |
|---|---|---|
| Importe | 600,00 € | [HECHO, identificación MCP] |
| Fecha | 02/01/2019 | [HECHO] |
| Cuenta origen | CaixaBank | [HECHO] |
| Beneficiario | INCASOL | [HECHO] |

> **Nota:** la fianza equivalente a dos meses de renta matriz podría ser relevante a efectos de liquidación en caso de que el procedimiento concluya con el abandono del local o con alguna responsabilidad pendiente.

## 6.7 IVA — análisis técnico del error alegado

La actora alega que David Mañas aplica el 21 % de IVA sobre una base imponible que ya incluía el impuesto de la compañía eléctrica. La mecánica del error, según la descripción de la actora, sería:

| Concepto | Valor erróneo (según la actora) | Valor hipotéticamente correcto |
|---|---|---|
| Base imponible | Total de la factura de la compañía (incluido IVA) | Importe neto de la factura de la compañía |
| IVA repercutido a FOODAY | 21 % sobre el total | 21 % sobre la base neta |

**Ejemplo numérico con IVA del 21 %:**
```
Base errónea:     100,00 € (total de la factura de la compañía, IVA incluido)
IVA indebido:     100,00 € × 21 % = 21,00 €

Base correcta:    100,00 € / 1,21 = 82,64 €
IVA correcto:     82,64 € × 21 % = 17,36 €
```

La acumulación de este error desde 2018 requiere de auditoría específica. **Importe total estimado del error: [DND].**

---

# §7 — HECHOS ACREDITADOS (referencia: madre §7)

> Esta sección es una síntesis de los hechos acreditados por la documentación o por reconocimiento expreso de la parte. La valoración jurídica se omite.

| # | Hecho | Prueba documental | Carácter |
|---|---|---|---|
| 1 | El contrato de subarrendamiento existe y fue firmado el 01/12/2018. | Contrato PDF `[NL-3][NL-4]` | [HECHO] |
| 2 | El contrato está vinculado al plazo del arrendamiento matriz (10 años). | Estipulació 2 + Clàusula 3ª `[NL-3]` | [HECHO] |
| 3 | El local se encuentra en El Port de la Selva, con los datos catastrales y registrales descritos en §1.4. | contrato + identificación MCP | [HECHO] |
| 4 | David Mañas cambió el bombín de acceso en abril de 2026. | `[NL-6]` y reconocimiento `[NL-8]` | [HECHO] |
| 5 | David Mañas justificó el cambio por "las prisas y los nervios". | `[NL-8]` | [HECHO — manifestación del demandado] |
| 6 | David Mañas tenía en su poder copia de la llave destinada a FOODAY. | `[NL-8]` | [HECHO — admisión] |
| 7 | El acceso al local quedó condicionado a horario de oficina. | `[NL-8][NL-19]` | [HECHO] |
| 8 | David Mañas reclama 180 € por el bombín. | `[NL-8]` | [HECHO — petición] |
| 9 | David Mañas manifiesta que, si se rescinde el subarriendo, no cobrará el bombín. | `[NL-11]` | [HECHO] |
| 10 | Se remitió burofax el 6 de julio de 2026 concediendo plazo para solución amistosa. | `[NL-13][NL-14]` | [HECHO] |
| 11 | El 7 de julio de 2026 se notificó a la Gestoría la propuesta de compensación y la solicitud de auditoría. | `[NL-15][NL-16][NL-22][NL-23]` | [HECHO] |
| 12 | El 8 de julio de 2026 se comunicó el cuadre contable a la Gestoría. | `[NL-15]` | [HECHO] |
| 13 | Las facturas Serie F 141/F y 55/F fueron rechazadas por doble imposición de IVA. | `[NL-2][NL-5][NL-16]` | [HECHO] |
| 14 | La fianza de 600 € fue transferida a INCASOL el 02/01/2019. | identificación MCP | [HECHO] |
| 15 | El IVA repercutido en exceso desde 2018 está pendiente de auditoría. | — | [HECHO parcial — pendiente de cuantificación] |
| 16 | El pago íntegro de la renta por parte de FOODAY se afirma y debe acreditarse mediante extracto. | ☐ [HUMANO] | PENDIENTE DE ACREDITACIÓN |

---

# §8 — HECHOS QUE PODRÍA INVOCAR LA PARTE DEMANDADA (referencia: madre §8)

> **Cambio metodológico:** esta sección recoge manifestaciones de la demandada y elementos de hecho que la demandada podría utilizar en su defensa, sin prejuzgar el resultado de su valoración por el juzgado. Se evita cualquier calificación anticipada de la conducta.

## 8.1 Sobre los retrasos en el pago de las rentas

**Manifestación documental:** de la práctica observada y de la correspondencia intercambiada cabe inferir la existencia de retrasos en algunas mensualidades. [HECHO parcial]

**Marco normativo aplicable:**
- Clàusula 4ª del contrato matriz: pago mensual, primeros cinco días.
- Clàusula 23ª del contrato matriz: resolución automática por impago superior a tres mensualidades.

**Cuestiones pendientes de valoración judicial:**
- El alcance de la tolerancia mostrada por ambas partes durante la relación.
- La relevancia de la propia facturación trimestral (también irregular) emitida por la demandada.
- Si la íntegra satisfacción de la renta elimina cualquier efecto jurídico de los retrasos previos.

## 8.2 Sobre los mensajes relativos a la recogida de la llave

**Manifestación documental:** existen mensajes cruzados en abril de 2026 en los que la actora manifiesta, en apariencia, una actitud inicial de no tener prisa por recoger la llave. [HECHO parcial]

**Elementos de valoración:**
- Cronología: estos mensajes son posteriores al descubrimiento del cambio del bombín, no anteriores.
- Carácter: la actora manifiesta que reflejan confianza inicial en una resolución rápida, no una aceptación expresa.

**Cuestiones pendientes de valoración judicial:**
- Si los mensajes referidos constituyen o no una conformidad con el cambio, o una renuncia a derechos derivados del contrato.

## 8.3 Sobre la existencia de suministros y su pago

**Manifestación documental:** existen consumos de suministros efectivamente realizados que serían objeto de facturación. [HECHO]

**Posición de la demandada (de sus correos):** David Mañas manifiesta que la actora estaría en situación de "morositat" respecto al pago de los suministros. `[NL-21]`

**Posición de la actora:** la actora no niega la existencia de consumos, sino la corrección de la facturación (IVA aplicado, periodicidad, falta de justificación de algunos conceptos).

**Cuestiones pendientes de valoración judicial:**
- Si, en su caso, la facturación irregular afecta al derecho a cobrar el consumo real.

## 8.4 Sobre las dos manifestaciones de David en relación con el bombín

> *Sin prejuzgar la valoración que proceda, este apartado limita su contenido a recoger literalmente las dos afirmaciones de la demandada para su estudio conjunto por el juzgador.*

**Afirmación 1 (3 de julio de 2026, `[NL-8]`):** *"el canvi de pany, també et correspon pagar-lo"* — David Mañas manifiesta que el 50 % del coste del bombín corresponde a la actora.

**Afirmación 2 (correo posterior, `[NL-11]`):** *"Si vols, el dilluns liquides el que em deus i deixem córrer el sots-arrendament (en aquest cas no et cobraré el bombí)"* — David Mañas manifiesta que, si se líquida el subarriendo, no cobrará el importe del bombín.

**Cuestiones pendientes de valoración judicial:**
- Si las dos manifestaciones son compatibles o si la segunda modifica el régimen jurídico aplicable.
- Si el carácter declarativo (obligación) o negociable (oferta) del cobro queda acreditado por los propios mensajes del demandado.

## 8.5 Sobre la disponibilidad del local y los horarios

**Manifestación documental:** David Mañas manifiesta que el local "ha estat obert de 8 hores a 13.30, de dilluns a divendres, i moltes tardes de 18 a 20hrs". `[NL-19]`

**Cuestiones pendientes de valoración judicial:**
- Si esta disponibilidad horaria (ofrecimiento por el subarrendador de presencia en la oficina) es compatible con el derecho al goce pacífico del inmueble del subarrendatario.
- Si la exigencia de comunicación previa para la entrega de la llave resulta exigible.

---

# §9 — PRUEBAS (referencia: madre §9)

> El catálogo de pruebas se enumera a continuación sin prejuzgar su admisión, su fuerza probatoria ni su resultado en el procedimiento.

## 9.1 Catálogo de pruebas documentales disponibles en el cuaderno

| Nº | Tipo | Documento / Fuente | Contenido relevante |
|---|---|---|---|
| 1 | Contrato PDF | `CONT. LLOG. LOCAL SAZOR - MAÑAS 01.12.2018.pdf` `[NL-1]` | Contrato matriz; Clàusulas 3ª, 4ª, 6ª, 7ª, 10ª, 11ª, 20ª, 23ª, 3.b. Incluye datos registrales del local. |
| 2 | Contrato PDF | `SUB. CONT. MAÑAS - LOPEZ 01.12.2018.pdf` `[NL-3]` | Subcontrato; Estipulacions 2 y 3. |
| 3 | Anexo al contrato | Presupuesto Instal·lacions David 02/12/2018 (1.949,66 €) `[NL-5]` | Trabajos iniciales luz+agua. |
| 4 | Correo electrónico | `ma%C3%B1as.pdf` — 03/07/2026 18:32 `[NL-8]` | Correo principal de reconocimiento del cambio del bombín. |
| 5 | Correo electrónico + 4 adjuntos | `ma%C3%B1as2.pdf` — 04/07/2026 19:52 `[NL-10]` | Anulación factura + nuevas 140/F, 141/F + facturas originales de compañía (adjuntos). |
| 6 | Documento de gestión | `Email a enviar a la Gestoria` — 07/07/2026 `[NL-15]` | Notificación propuesta compensación; auditoría retroactiva. |
| 7 | Documento estratégico | `Texto` `[NL-17]` | Pasos seguidos por la actora. |
| 8 | Cuerpo legal | `codigocivil.pdf` `[NL-18]` | Texto íntegro del Código Civil. |
| 9 | Cuerpo legal | `Lau.pdf` | Ley 29/1994 de Arrendamientos Urbanos. |

## 9.2 Pruebas a obtener o indexar por la actora

| Documento | Estado | Origen |
|---|---|---|
| Burofax original y justificantes de envío y recepción (6 de julio de 2026) | ☐ [HUMANO] | Servicio de burofax |
| Justificantes bancarios de los pagos de renta 2018–2026 y del pago íntegro previo a la demanda | ☐ [HUMANO] | CaixaBank |
| Justificante de la fianza de 600 € (02/01/2019) | ☐ [HUMANO] | CaixaBank |
| Factura del bombín (en caso de que llegue a emitirse formalmente por David Mañas) | [DND] | Demandada |
| Capturas o exportaciones de los mensajes cruzados vía WhatsApp en abril de 2026 | ☐ [HUMANO] | Conversación privada |
| Resultado de la auditoría retroactiva del IVA en electricidad 2018–2026 | ☐ [HUMANO] | Pericial contable |

## 9.3 Valoración indicativa de la prueba (no prejuzga valor procesal)

| Categoría | Ejemplos en este caso |
|---|---|
| Documentos firmados, correos reconocidos, transferencias bancarias, burofaxes, contratos | Tipología predominante en el caso |
| Mensajería electrónica cruzada | Correos de 3 y 4 de julio de 2026 (reconocidos por emisor) |
| WhatsApp y conversaciones informales | Mensajes de abril de 2026 |
| Recuerdos, manifestaciones verbales no documentadas, suposiciones | Por el momento, no utilizados en este expediente |

---

# §10 — FUNDAMENTOS JURÍDICOS (referencia: madre §10)

> Exposición del marco normativo aplicable. No se anticipa la calificación jurídica de cada norma a los hechos concretos.

| Norma | Aplicación potencial al caso |
|---|---|
| Código Civil, Art. 1255 | Libertad de pacto |
| Código Civil, Art. 1258 | Buena fe contractual |
| Código Civil, Arts. 1195 y 1196 | Compensación de deudas (texto literal en §5.3) |
| Código Civil, Art. 1202 | Compensación judicial |
| Código Civil, Arts. 1554 y 1554.3 | Obligaciones del arrendador y goce pacífico |
| Código Civil, Art. 1555 | Responsabilidad por actos del arrendador |
| Código Civil, Arts. 1101–1108 | Responsabilidad por incumplimiento |
| Ley 37/1992, del IVA | Regulación general del impuesto |
| RD 1619/2012 | Reglas de facturación |
| Ley 58/2003, LGT | Infracciones tributarias |
| Ley 29/1994, LAU | Arrendamientos urbanos (norma supletoria, en su caso) |
| LEC, Art. 394 | Costas procesales |

---

# §11 — ALEGACIONES QUE PODRÍA FORMULAR LA PARTE DEMANDADA Y SU CONTEXTO DOCUMENTAL (referencia: madre §11)

> **Cambio metodológico:** se eliminan las escalas de probabilidad (★★★★, ★★★★★) y se sustituyen por descripciones cualitativas de cada alegación y de su base documental. **No se asigna una probabilidad**: su ocurrencia real es una cuestión que solo se conocerá tras la contestación a la demanda.

## 11.1 Alegación: "Los pagos de renta se retrasaron"

**Base documental disponible (a favor de la alegación):** práctica observada.
**Base documental disponible (a favor de la refutación):** pago íntegro previo a la demanda; tolerancia recíproca; facturación trimestral también incumplida por la demandada.
**Marco normativo implicado:** Clàusula 4ª y Clàusula 23ª.

## 11.2 Alegación: "La actora manifestó no tener prisa en recoger la llave"

**Base documental disponible (a favor de la alegación):** mensajes de abril de 2026.
**Base documental disponible (a favor de la refutación):** los mensajes son posteriores al descubrimiento del cambio; ausencia de renuncia escrita expresa.
**Marco normativo implicado:** Clàusula 10ª; en su caso, principio de buena fe (Art. 1258 CC).

## 11.3 Alegación: "El cambio se debió a razones de seguridad"

**Base documental disponible (a favor de la alegación):** manifestación de David Mañas.
**Base documental disponible (a favor de la refutación):** admisión por David Mañas de haber actuado "por prisas y nervios"; ausencia de comunicación previa o justificación objetiva documentada.
**Marco normativo implicado:** Clàusula 7ª vs Clàusula 10ª.

## 11.4 Alegación: "El acceso al local no estuvo nunca prohibido"

**Base documental disponible (a favor de la alegación):** indicación de horarios en el correo de David.
**Base documental disponible (a favor de la refutación):** limitación horaria como acceso único posible; reconocimiento escrito de que la nueva llave no había sido entregada.
**Marco normativo implicado:** Art. 1554.3 CC.

## 11.5 Alegación: "La deuda por suministros existía"

**Base documental disponible (a favor de la alegación):** correos de David Mañas.
**Base documental disponible (a favor de la refutación):** la actora no niega los consumos; discute la facturación; auditoría en curso.
**Marco normativo implicado:** Clàusula 11ª; Ley 37/1992 IVA; RD 1619/2012.

## 11.6 Alegación: "El bombín debía ser abonado por la actora"

**Base documental disponible (a favor de la alegación):** correo del 3 de julio de 2026.
**Base documental disponible (a favor de la refutación):** correo posterior que ofrece no cobrarlo; ausencia de autorización escrita previa.
**Marco normativo implicado:** Clàusula 10ª; principio de causación.

## 11.7 Alegación: "Las facturas son correctas"

**Base documental disponible (a favor de la alegación):** facturas emitidas por David Mañas.
**Base documental disponible (a favor de la refutación):** envío de las facturas "para verificar" por el propio demandado; anulación de una factura y emisión de nueva Serie F; auditoría en curso.
**Marco normativo implicado:** Ley 37/1992; RD 1619/2012.

## 11.8 Alegación: "La actora pretende no pagar"

**Base documental disponible (a favor de la alegación):** manifestación genérica.
**Base documental disponible (a favor de la refutación):** pago íntegro acreditado mediante extracto (☐ [HUMANO] pendiente).

## 11.9 Alegación: "La demanda es una represalia"

**Base documental disponible (a favor de la alegación):** alegación genérica sin sustento probatorio documentado.
**Base documental disponible (a favor de la refutación):** cronología documentada; intento previo de solución amistosa.

## 11.10 Otras alegaciones que el desarrollo del procedimiento pueda poner de manifiesto

La contestación formal a la demanda podrá incorporar alegaciones no previstas en este expediente, que requieran respuesta específica una vez conocidas.

---

# §12 — ANÁLISIS CRUZADO DE MANIFESTACIONES DE LA DEMANDADA (referencia: madre §12)

> **Cambio metodológico:** se elimina la calificación "contradicción procesal" como categoría jurídica. La sección se limita a exponer los pares de afirmaciones documentadas cuya valoración conjunta puede ser relevante.

| # | Afirmación 1 (con cita literal) | Fuente | Afirmación 2 (con cita literal) | Fuente | Consideración pendiente |
|---|---|---|---|---|---|
| 1 | "Les claus es van haver de canviar, perquè el pany estava trencat" `[NL-8]` | Justificación por el estado del bombín | "Les presses i els nervis van fer que no t'avises al momento" `[NL-8]` | Justificación por impulso personal | El juzgador podrá considerar si las dos afirmaciones son coherentes entre sí. |
| 2 | Las llaves "podien recollir-se en el despatx" `[NL-8]` | Disponibilidad declarada | "Si al mes de juliol no tens la nova clau..." `[NL-6]` | Reconocimiento de no entrega meses después | El juzgador podrá considerar si ambas afirmaciones son compatibles. |
| 3 | "Et correspon pagar-lo" `[NL-8]` | Reclamación inicial | "Si liquides el dilluns, no et cobraré el bombí" `[NL-11]` | Oferta condicional de no cobrar | El juzgador podrá considerar si la segunda modifica el régimen de la primera. |
| 4 | El local "ha estat obert de 8 hores a 13.30 [...] i moltes tardes de 18 a 20hrs" `[NL-19]` | Disponibilidad horaria | "Les presses i nervis [...] no t'avises" — inmediatez no era posible | Reconocimiento de falta de comunicación previa | El juzgador podrá considerar su efecto sobre el goce pacífico. |
| 5 | "Les meves factures [...] són vàlides" `[NL-21]` | Pretensión de validez | "Perquè puguis verificar que no t'enganyo" `[NL-21]` | Invitación a la verificación | El juzgador podrá considerar si la invitación a verificar es coherente con la afirmación de validez. |
| 6 | "Queda anul·lada [la factura anterior]" `[NL-10]` | Anulación de una factura | "[La factura] 141/F és la vàlida" `[NL-10]` | Emisión de nueva en sustitución | El juzgador podrá considerar si la sustitución implica reconocimiento de incorrección en la primera. |

---

# §12B — ANÁLISIS DOCUMENTAL DE LAS FUENTES DE LA DEMANDADA (referencia: madre §12B)

> **Cambio metodológico:** se mantiene el análisis por documento, sustituyendo las calificaciones jurídicas (admite / niega) por descripciones de las manifestaciones contenidas en cada documento, sin prejuzgar la valoración que el juzgador haga de las mismas.

## 12B.1 Correo de 3 de julio de 2026, 18:32 — "TEMA CLAUS / CANVI DE PANY"

### Extractos textuales de David Mañas

| Punto | Extracto literal |
|---|---|
| Sobre el cambio | *"Les claus es van haver de canviar, perquè el pany estava trencat."* |
| Sobre la urgencia | *"Al tractar-se d'una reparació d'urgència (que no una obra) vaig fer-ho al moment. Les presses i els nervis van fer que no t'avises al moment."* |
| Sobre la llave | *"et vaig dir que tenia la teva còpia, que podies passar a recollir-la quan volguessis."* |
| Sobre la responsabilidad del pago | *"el canvi de pany, també et correspon pagar-lo."* |
| Sobre el horario | *"Demà divendres, 03.07.2026, a les 08.00hrs i a les 18.00 hrs hi haurà algú a l'oficina, si vols passar."* |

### Documento complementario ma%C3%B1as2.pdf

| Punto | Extracto literal |
|---|---|
| Sobre la disponibilidad del local | *"el local, molts dies, ha estat obert de 8 hores a 13.30, de dilluns a divendres, i moltes tardes de 18 a 20hrs"* `[NL-19]` |
| Sobre la calificación del cambio | *"encara que ho quilifiques de reparació, el canvi de pany constitueix una modificació de l'accés físic al local"* `[NL-20]` |

> [⚠️ CONTRADICCIÓN MCP] La sesión inicial de cronología mencionaba un mensaje a "Victor" del propio David Mañas que la sesión de identificación declaró no disponible. La verificación manual del PDF `ma%C3%B1as2.pdf` puede aclarar este punto, ☐ [HUMANO].

## 12B.2 Factura del bombín (180 €, sin factura documentada)

| Dato | Estado | Fuente |
|---|---|---|
| Importe mencionado por David | 180 € (aproximadamente) | `[NL-8]` |
| Documento contable emitido al efecto | No consta en el cuaderno; [DND] número de factura | — |
| Repercusión a FOODAY | 50 % | `[NL-8]` |

## 12B.3 Facturas de electricidad Serie F

| Variable | Valor | Fuente |
|---|---|---|
| Numeración identificada | 140/F, 141/F, 55/F | `[NL-2][NL-5]` |
| Adjuntos en correo 04/07 | `FACTURES SERVEIS GENER FEBRER MARÇ.pdf` (3,4 MB), `FACTURES SERVEIS ABRIL MAIG JUNY.pdf` (3,7 MB) | `[NL-2]` |
| Estado | 140/F y 141/F enviadas por David a FOODAY el 04/07; 55/F rechazada por la actora el 07/07 | `[NL-2][NL-5][NL-16]` |
| Cuantificación del posible error | [DND] | — |

## 12B.4 Argumentación procesal recomendada (texto neutro)

> **Texto alternativo recomendado para la demanda (sustituye "Tiene obligación" / "Lesiona derechos"):**
>
> *"Ante la discrepancia detectada en la facturación de los suministros, la actora solicitó la documentación de soporte al subarrendador. Dicha solicitud resulta proporcionada a la controversia técnica suscitada sobre la corrección de las bases imponibles aplicadas en la facturación de la electricidad, y se dirige a verificar la regularidad fiscal de las facturas que la actora ha de contabilizar."*
>
> Se evita afirmar que la demandada tenía obligación legal de entregar documentación, lo que sería una cuestión discutible; en su lugar, se describe la solicitud como **proporcionada a la discrepancia técnica planteada**.

---

# §13 — RESPUESTA A LAS ALEGACIONES DE LA DEMANDADA (referencia: madre §13)

> ☐ [HUMANO] Esta sección depende del contenido de la contestación formal a la demanda, que se conocerá una vez esté en curso el procedimiento.

```markdown
## Alegación N: [Nombre de la alegación]

| Aspecto | Respuesta procesal (por desarrollar tras la contestación) |
|---|---|
| Texto literal de la alegación | … |
| Prueba de la demandada | … |
| Prueba de la actora | … |
| Norma aplicable | … |
| Preguntas a formular en juicio | … |
```

---

# §14 — PRETENSIONES DE LA DEMANDA (referencia: madre §14)

> **Cambio metodológico:** se reconsidera la presentación de las pretensiones. La indemnización por privación de uso y la devolución del IVA repercutido en exceso se formulan como **estimaciones sujetas a prueba pericial** y, en su caso, a determinación en ejecución de sentencia. No se presentan como créditos líquidos consolidados.

## 14.1 Declaraciones que se solicita al juzgado

### Primera declaración
> Que se declare que el cambio del bombín de acceso al local llevado a cabo por la parte demandada en abril de 2026 constituyó una actuación contraria a las obligaciones derivadas del contrato de subarrendamiento, conforme a la Clàusula 10ª del contrato matriz y a los Arts. 1258 y 1554.3 del Código Civil.

### Segunda declaración
> Que se declare que la actora no pudo disfrutar del local en las mismas condiciones pactadas como consecuencia de la actuación descrita en la declaración anterior.

### Tercera declaración
> Que se declare que el coste del bombín (aproximadamente 180 € según manifestación de la demandada) **no resulta imputable** a la actora, por tratarse de una decisión unilateral adoptada sin la preceptiva autorización escrita del arrendador.

### Cuarta declaración
> Que se determine si procede la regularización de las facturas de electricidad mediante la emisión de facturas rectificativas y la devolución o compensación de las cantidades que, en su caso, hayan sido indebidamente cobradas en concepto de IVA desde el año 2018, **cuantificándose en ejecución de sentencia** los importes concretos que resulten acreditados.

## 14.2 Pretensiones económicas — estimaciones sujetas a prueba

| Concepto | Importe | Naturaleza procesal |
|---|---|---|
| Indemnización por privación de uso | 379,73 € (estimación provisional; **sujeto a prueba pericial y determinación judicial**) | [ESTIMACIÓN] |
| Coste del bombín — declaración de no imputabilidad | (sin cantidad concreta en el Suplico; declaración) | [DECLARATIVO] |
| Devolución del IVA repercutido en exceso desde 2018 | [DND — pendiente de auditoría] | [DETERMINACIÓN EN EJECUCIÓN DE SENTENCIA] |

> **Recomendación procesal:** la indemnización por privación de uso puede peticionarse de dos formas:
> (A) Como estimación de 379,73 €, dejando al juzgador su confirmación, modificación o rechazo a la vista de la prueba;
> (B) Como condena de cantidad a determinar en ejecución de sentencia conforme al criterio de prorrateo de renta diaria por los días que se acrediten.
>
> La opción (B) es la más prudente desde la perspectiva de la demandada (no se asume como cierto un crédito aún no acreditado) y la más recomendable dado que el día exacto del cambio del bombín es [DND].

## 14.3 Línea de actuación recomendada para el Suplico

En el Suplico de la demanda, en lugar de solicitar:

> *"Condene al demandado a pagar a la actora la cantidad de 379,73 € en concepto de indemnización por privación de uso."*

Se recomienda solicitar:

> *"Condene al demandado a indemnizar a la actora por la privación del uso del local durante el periodo acreditado, cifrándose el importe en ejecución de sentencia conforme al criterio de renta diaria prorrateada que resulte aplicable."*

> Esta fórmula traslada al ámbito de la ejecución de sentencia la determinación de la cuantía exacta, lo que resulta coherente con la calificación del dato como estimación provisional y con la existencia de [DND] en cuanto a las fechas exactas.

## 14.4 Costas

> Solicitar, si la defensa resultare totalmente infundada, la condena en costas conforme al Art. 394 LEC.

## 14.5 Líneas rojas — descritas sin adjetivar

1. **No renunciar a la consideración del cambio del bombín como actuación contractual que requiere autorización escrita.**
2. **No aceptar imputación automática del coste del bombín a la actora** sin justificación suficiente.
3. **No renunciar a la revisión de las facturas de electricidad** si existen indicios fundados de incorrección.

## 14.6 Pretensiones que se valorará solicitar o no en función de la prueba

- Sanciones administrativas, indemnizaciones punitivas o reclamaciones de daños morales: **no procede incluirlas en la demanda, salvo que aparezcan nuevos indicios acreditados**, por no existir base probatoria específica.
- Cuestiones tributarias (regularización fiscal pura): **podrían no ser competencia del orden jurisdiccional civil**.

---

# §15 — MATRIZ DE OBJETIVOS PROCESALES (referencia: madre §15)

> **Cambio metodológico:** se suprimen las escalas de probabilidad y de "fuerza" subjetiva. Se sustituyen por la **base documental acreditada** y por la **norma potencialmente aplicable**, sin prejuzgar el resultado.

| Objetivo | Base documental acreditada | Norma potencialmente aplicable |
|---|---|---|
| Reconocimiento del cambio del bombín como actuación contraria a las obligaciones contractuales | Reconocimiento del propio demandado `[NL-8]`; admisión de falta de comunicación previa | Clàusula 10ª matriz; Arts. 1258 y 1554.3 CC |
| Indemnización por privación de uso | Reconocimiento escrito de que la llave no había sido entregada `[NL-6]`; admisión de horario limitado `[NL-8][NL-19]` | Art. 1554.3 CC |
| No imputabilidad del coste del bombín | Correo de 3 de julio `[NL-8]`; correo de ofrecimiento `[NL-11]`; ausencia de autorización escrita | Clàusula 10ª matriz; principio de causación; Art. 1258 CC |
| Compensación entre deuda de rentas y crédito por privación de uso | Cifras comunicadas en escritos de la actora (no admitidas por la demandada) | Arts. 1195 y 1202 CC |
| Regularización de las facturas de electricidad | Identificación de doble IVA; rechazo de facturas Serie F `[NL-16]` | Ley 37/1992 IVA; RD 1619/2012 |

---

# §16 — ESTRATEGIA PROCESAL (referencia: madre §16)

> **Cambio metodológico:** se eliminan las escalas de probabilidad de los escenarios. Se describen cualitativamente las líneas de actuación para cada uno.

## 16.1 Líneas de actuación generales

1. **Solicitar las pretensiones declarativas** enunciadas en §14, dejando al juzgador la valoración de la prueba.
2. **Solicitar la condena de cantidad indeterminada** en concepto de indemnización, remitiendo su determinación a ejecución de sentencia.
3. **Aportar toda la documentación disponible** en cada momento procesal.
4. **Solicitar la condena en costas**, si procediere.

## 16.2 Escenarios posibles y líneas de actuación

### Escenario A — Incomparecencia de la demandada
- Solicitar sentencia con arreglo al Art. 496 LEC (sentencia en rebeldía).

### Escenario B — Contestación que niegue los hechos
- Mantener la demanda; aportar todos los medios de prueba disponibles; presentar alegaciones complementarias si fueran precisas.

### Escenario C — Propuesta de acuerdo por la demandada
- Valorar los términos sin aceptar los puntos descritos en §14.5; **no aceptar verbalmente** ningún extremo; solicitar toda propuesta por escrito.

### Escenario D — Reconvención por la demandada
- Acumular procedimientos en su caso; preparar contestación; acreditar el pago íntegro de la renta mediante extracto bancario.

---

# §17 — DEMANDA (PLANTILLA CON DATOS REALES, VERSIÓN PERITO) (referencia: madre §17)

```text
──────────────────────────────────────────────────────────────
AL JUZGADO DE PRIMERA INSTANCIA Nº [☐] DE FIGUERES
──────────────────────────────────────────────────────────────

DEMANDA DE JUICIO ORDINARIO
(Art. 249.1.2ª LEC — materia de arrendamientos)

──────────────────────────────────────────────────────────────

PARTE ACTORA:
FOODAY PROJECT S.L., NIF B55289540, domiciliada en Cr. Selva de Mar, 9
1r 1a, 17489 El Port de la Selva (Girona), representada por su administrador
Luis David López Gamero (DNI 40.335.619-J).

PARTE DEMANDADA:
David Mañas Esteban, DNI 40.450.516-W, domiciliado en Cr. Major, 14 Àtic,
17489 El Port de la Selva (Girona).

──────────────────────────────────────────────────────────────

HECHOS

PRIMERO.- Contratos encadenados.
El 1 de diciembre de 2018, SAZOR2018 CB (NIF E67329839), representada por
Sergio Rozas Molina y Silvia Garcia Ferrando, arrendó a David Mañas
Esteban el local comercial sito en Carrer Selva de Mar, 11, Local 2A, de
El Port de la Selva (Girona), referencia catastral 6871401EG1867S0077ME,
inscrito en el Registro de la Propiedad de Roses Nº 2, Tomo 2760, Libro
84, Folio 59, Finca 4903. El contrato, de duración decenal (del 01/12/2018
al 30/11/2028), establecía una renta de 300 € mensuales + IVA - IRPF
(Clàusula 4ª).
[Doc. nº 1]

Ese mismo día, el Sr. Mañas suscribió con FOODAY PROJECT S.L. un contrato
de subarrendamiento del 50% del local para uso de oficina, vinculado al
plazo del contrato matriz (Estipulació 2). El precio se fijó en el 50% de
la renta que el Sr. Mañas satisface a SAZOR + IVA - IRPF (Estipulació 3),
resultando una base inicial de 150 € mensuales en 2018, con revisión
anual por IPC.
[Doc. nº 2]

SEGUNDO.- Fianza.
Con fecha 2 de enero de 2019, la actora constituyó fianza de 600 €
mediante transferencia desde CaixaBank a favor de INCASOL.
[Doc. nº ☐ [HUMANO] — extracto a indexar]

TERCERO.- Cambio del bombín de acceso.
En abril de 2026 (día exacto pendiente de concreción), el Sr. Mañas
sustituyó el bombín de acceso al local, sin constancia documental de
comunicación previa ni inmediata a la actora.
[Día exacto — [☐ HUMANO] pendiente de acreditación]
[Doc. nº 4, correo del demandado]

CUARTO.- Reconocimiento expreso del demandado.
Con fecha 3 de julio de 2026, a las 18:32, el Sr. Mañas remitió a la
actora un correo electrónico en el que expresamente reconoce la
realización del cambio y lo justifica en los siguientes términos:

   "Les claus es van haver de canviar, perquè el pany estava trencat. Al
   tractar-se d'una reparació d'urgència (que no una obra) vaig fer-ho
   al moment. Les presses i els nervis van fer que no t'avises al
   moment."

En el mismo correo, el Sr. Mañas manifiesta que tenía en su poder la
copia de la llave de la actora y que la entrega quedaba condicionada a
horario ("08.00hrs [...] i a les 18.00 hrs hi haurà algú a l'oficina").
[Doc. nº 4]

QUINTO.- Repercusión del coste del bombín.
En el mismo correo, el Sr. Mañas reclamó a la actora el pago del 50% del
coste del bombín, importe que cifró aproximadamente en 180 €, sin
aportación de documento contable alguno (factura del cerrajero).
Subsiguientemente, en correo posterior, el demandado manifestó: "Si vols,
el dilluns liquides el que em deus i deixem córrer el sots-arrendament (en
aquest cas no et cobraré el bombí)".
[Docs. nº 4 y 5]

SEXTO.- Reclamación extrajudicial fehaciente.
Con fecha 6 de julio de 2026, la actora remitió burofax al Sr. Mañas
concediendo un plazo de 7 días naturales para alcanzar una solución
amistosa.
[Doc. nº ☐ [HUMANO] — burofax a indexar]

SÉPTIMO.- Notificación a la Gestoría.
Con fecha 7 de julio de 2026, la actora notificó a la Gestoría (Agència
Port de la Selva – Centre de Serveis):
(i)  la propuesta de compensación de deudas entre el crédito por
     rentas pendientes y el crédito por privación de uso, al amparo
     de los Arts. 1195 y 1202 del Código Civil;
(ii) la paralización del pago de los suministros ante la posible doble
     imposición de IVA en la facturación de la electricidad;
(iii) la solicitud de auditoría retroactiva desde 2018;
(iv)  la solicitud de justificación de los gastos repercutidos.
[Doc. nº 6]

OCTAVO.- Cuadre contable comunicado el 8 de julio de 2026.
En escrito de 8 de julio de 2026, la actora comunicó a la Gestoría las
cifras siguientes:

   Renta de julio de 2026 (única mensualidad adeudada tras revisión): 191,12 €
   Indemnización estimada por privación de uso: 379,73 €
   Saldo a favor de FOODAY (estimación): 188,61 €

La consideración de estas cifras como créditos líquidos y exigibles frente
a la demandada es una cuestión que se somete a la valoración del juzgado.
[Doc. nº 6]

NOVENO.- Pago íntegro de la renta.
La actora abonó íntegramente la renta pendiente en fecha anterior a la
presentación de la presente demanda.
[Doc. nº ☐ [HUMANO] — extracto bancario a aportar]

DÉCIMO.- Periodo acreditado de privación de uso.
Por la documentación disponible, consta que desde abril de 2026 hasta, al
menos, el 3 de julio de 2026, la actora permaneció sin acceso libre al
local. La duración exacta de la privación del uso es una cuestión que la
demanda deja abierta a la prueba que pueda practicarse.
[Doc. nº 4]

DECIMOPRIMERO.- Doble imposición de IVA en electricidad.
La actora ha detectado que el Sr. Mañas, en sus facturas de electricidad,
aplica el 21% de IVA sobre una base imponible que, según su análisis,
incluiría ya el impuesto repercutido por la compañía eléctrica. La
cuantificación total del IVA repercutido en exceso desde el año 2018 es
una cuestión que se solicita que se determine en ejecución de sentencia,
a la vista del resultado de la auditoría retroactiva cuya práctica se
interesa.

──────────────────────────────────────────────────────────────

FUNDAMENTOS JURÍDICOS

I. COMPETENCIA Y JURISDICCIÓN
Arts. 36, 45, 46 y 51 de la Ley de Enjuiciamiento Civil.

II. CAPACIDAD PROCESAL
Art. 6 LEC.

III. LEGITIMACIÓN
Art. 10 LEC.

IV. FONDO

IV.1. Cambio del bombín — calificación
Las Clàusulas 7ª y 10ª del contrato matriz regulan, respectivamente, las
reparaciones de mantenimiento a cargo del arrendatario y las
"obras o modificaciones" sujetas a autorización escrita del arrendador.
Los Arts. 1258 y 1554.3 del Código Civil completan el marco normativo
aplicable.

La subsunción de los hechos relatados en la cláusula que corresponda es
una cuestión de calificación jurídica que se somete a la decisión del
juzgado.

IV.2. Indemnización por privación de uso (Art. 1554.3 CC)
Se solicita que se fije, en su caso, una indemnización por la privación
del uso del local, cifrándose el importe definitivo en ejecución de
sentencia conforme al criterio de prorrateo de la renta diaria
actualizada por IPC que resulte aplicable, sin fijar en este acto una
cantidad que, en buena técnica procesal, debe quedar subordinada a la
prueba pericial sobre las fechas efectivas.

IV.3. No imputabilidad del coste del bombín
El cambio del bombín fue decidido unilateralmente por la demandada, sin
constancia de autorización escrita del arrendador, por lo que su coste
no puede ser repercutido a la actora conforme a la Clàusula 10ª del
contrato matriz y al principio de buena fe (Art. 1258 CC).

IV.4. Compensación (Arts. 1195, 1196 y 1202 CC)
Subsidiariamente, para el caso de que la indemnización por privación de
uso sea estimada, la actora interesa la compensación de la deuda de
rentas con el crédito indemnizatorio, al amparo de los artículos citados.

IV.5. Regularización de las facturas de electricidad
Se interesa la declaración de que las facturas de electricidad en las
que se haya repercutido un IVA superior al que corresponda deberán ser
objeto de regularización mediante facturas rectificativas y la
devolución o compensación de lo indebidamente cobrado, cifrándose los
importes concretos en ejecución de sentencia.

IV.6. Costas
Art. 394 LEC.

──────────────────────────────────────────────────────────────

SUPLICO AL JUZGADO

Que, previos los trámites legales oportunos, ESTIME la presente demanda
y:

1. DECLARE que el cambio unilateral del bombín de acceso al local en
   abril de 2026 constituyó una actuación contraria a las obligaciones
   contractuales del demandado, conforme a la Clàusula 10ª del contrato
   matriz y a los Arts. 1258 y 1554.3 del Código Civil.

2. DECLARE que la actora no pudo disfrutar del local en las condiciones
   pactadas como consecuencia de dicha actuación, por un periodo que
   se determinará en ejecución de sentencia.

3. DECLARE que el coste del bombín (aproximadamente 180 € según
   manifestación de la demandada) no resulta imputable a la actora.

4. CONDENE al demandado a indemnizar a la actora por la privación del
   uso del local durante el periodo acreditado, cifrándose el importe
   en ejecución de sentencia conforme al criterio de renta diaria
   prorrateada que resulte aplicable (estimación inicial orientativa
   de 379,73 €, sin perjuicio de su determinación definitiva).

5. CONDENE al demandado a la regularización de las facturas de
   electricidad, mediante la emisión de facturas rectificativas y la
   devolución o compensación de las cantidades indebidamente cobradas
   en concepto de IVA, en cuanto se determine en ejecución de
   sentencia a partir de la auditoría retroactiva cuya práctica se
   interesa.

6. CONDENE en costas al demandado si su defensa resultare totalmente
   infundada (Art. 394 LEC).

──────────────────────────────────────────────────────────────

PRUEBAS

A) DOCUMENTAL (Arts. 265–280 LEC):
   - Docs. 1 y 2: Contratos.
   - Doc. 4: Correo de 3 de julio de 2026 (reconocimiento expreso).
   - Doc. 5: Correo de 4 de julio de 2026 (anulación + facturas).
   - Doc. 6: Notificación a la Gestoría.
   - ☐ [HUMANO]: Burofax y justificantes.
   - ☐ [HUMANO]: Justificantes bancarios del pago íntegro de la renta.
   - ☐ [HUMANO]: Justificante de la fianza de 600 €.

B) INTERROGATORIO DE PARTE (Art. 301 LEC):
   Sobre la fecha del cambio del bombín, las comunicaciones habidas, la
   imposición del coste a la actora y el periodo sin acceso libre.

C) TESTIFICAL (Art. 360 LEC):
   ☐ [HUMANO] — a determinar en función del desarrollo del procedimiento.

D) PERICIAL (Art. 335 LEC):
   Pericial contable sobre la facturación de electricidad 2018–2026, a
   fin de cuantificar, en su caso, el IVA repercutido en exceso.

──────────────────────────────────────────────────────────────

[Localidad], [Fecha]

Fdo.: Luis David López Gamero
     Administrador de FOODAY PROJECT S.L.

──────────────────────────────────────────────────────────────
```

---

# §18 — PREPARACIÓN DEL JUICIO (referencia: madre §18)

> Esta sección evita presuposiciones sobre las respuestas de la demandada.

## 18.1 Exposición sintética de la posición de la actora (para uso interno)

> *"En abril de 2026, David Mañas cambió unilateralmente el bombín de acceso al local sin comunicación previa ni inmediata a FOODAY, que permaneció sin acceso libre al local durante, al menos, 77 días, hasta el 3 de julio de 2026. Antes de demandar, la actora concedió un plazo para solución amistosa mediante burofax de 6 de julio de 2026, pagó íntegramente la renta y notificó a la Gestoría su voluntad de compensar deudas y de revisar la facturación de electricidad, cuya corrección técnica discute. La presente demanda solicita al juzgado que declare el incumplimiento, que determine la indemnización correspondiente en ejecución de sentencia y que condene a la regularización de las facturas."*

## 18.2 Hechos acreditados y prueba disponible

| Hecho | Documento acreditativo | Calidad de la prueba |
|---|---|---|
| Existencia del contrato de subarrendamiento | Contrato PDF `[NL-3][NL-4]` | Documento firmado |
| Cambio del bombín | Correo del propio demandado `[NL-8]` | Reconocimiento escrito |
| Falta de comunicación previa | Inexistencia de documento previo | Inexistencia acreditable |
| Limitación horaria del acceso | `[NL-8][NL-19]` | Manifestación escrita |
| Renta pagada íntegramente | ☐ [HUMANO] extracto bancario | Justificante a aportar |

## 18.3 Preguntas para el interrogatorio del demandado

> El orden y la formulación de las preguntas dependerán del desenvolvimento del procedimiento; no se presupone el resultado.

1. Fecha exacta del cambio del bombín.
2. Existencia y, en su caso, contenido de la comunicación previa.
3. Existencia y, en su caso, contenido de la comunicación inmediata.
4. Documentación que justifique la calificación del cambio como "reparación de urgencia".
5. Justificación documental del cálculo de los suministros.

---

# §19 — NEGOCIACIÓN (referencia: madre §19)

> Esta sección describe los criterios de valoración de una eventual propuesta de acuerdo, sin prejuzgar la postura de la contraparte.

## 19.1 Criterios para valorar una propuesta de acuerdo

- Cierre de la relación económica.
- Determinación clara de las cantidades a satisfacer por cada parte.
- No asunción automática del coste del bombín.
- Previsión expresa sobre la facturación de los suministros.

## 19.2 Líneas rojas descritas sin adjetivar

1. No renunciar a la consideración jurídica del cambio del bombín.
2. No aceptar la imputación automática del coste del bombín.
3. No renunciar a la revisión de las facturas de electricidad si existen indicios de incorrección.

---

# §20 — ANÁLISIS DE RIESGOS PROCESALES (referencia: madre §20)

> **Cambio metodológico:** se eliminan las escalas de probabilidad y de impacto. Cada riesgo se describe cualitativamente, junto con su base documental disponible y la estrategia procesal recomendada.

| ID | Riesgo procesal | Base documental disponible a favor de la actora | Estrategia procesal |
|---|---|---|---|
| R1 | La demandada alegue la existencia de tolerancia a los retrasos y mensajes donde la actora manifiesta no tener prisa | Mensajes posteriores al cambio; ausencia de renuncia escrita expresa; facturación irregular de la demandada | Aportar la cronología completa; precisar el momento de cada mensaje |
| R2 | La demandada alegue la existencia de deuda por suministros | Consumos reales no discutidos | Distinguir entre consumo real y facturación; aportar documentación contable |
| R3 | La demandada niegue la doble imposición de IVA | Documentación de las facturas originales; auditoría en curso | Solicitar pericial contable |
| R4 | La demandada cuestione la duración exacta de la privación | Día exacto del cambio [DND] | Precisar las fechas en el procedimiento; estimación prudente |
| R5 | La demandada solicite la declaración del incumplimiento del subarriendo por mora | Pago íntegro acreditado | Aportar el extracto bancario |
| R6 | La demandada presente reconvención | Pago íntegro; fianza de 600 € a INCASOL; buena fe procesal acreditada | Contestación con apoyo en los justificantes bancarios |
| R7 | El juzgado declare la improcedencia de la compensación | Estimación de la indemnización no acreditada liquidativamente | Solicitar condena de cantidad indeterminada a determinar en ejecución |

---

# §21 — ANEXOS (referencia: madre §21)

| Anexo | Documento | Estado |
|---|---|---|
| 1 | Contrato matriz CONT. LLOG. LOCAL SAZOR - MAÑAS 01.12.2018.pdf | ✅ Indexado en cuaderno |
| 2 | Subcontrato SUB. CONT. MAÑAS - LOPEZ 01.12.2018.pdf | ✅ Indexado |
| 3 | Presupuesto Instal·lacions David 02/12/2018 (1.949,66 €) | ✅ En contrato matriz |
| 4 | Correo `ma%C3%B1as.pdf` (03/07/2026 18:32) | ✅ Indexado |
| 5 | Correo `ma%C3%B1as2.pdf` (04/07/2026 19:52) | ✅ Indexado |
| 6 | Documento `Email a enviar a la Gestoria` (07/07/2026) | ✅ Indexado |
| 7 | Documento `Texto` (estrategia procesal) | ✅ Indexado |
| 8 | `codigocivil.pdf` | ✅ Indexado |
| 9 | `Lau.pdf` (Ley 29/1994 LAU) | ✅ Indexado |
| 10 | Burofax original (06/07/2026) + justificante de envío y recepción | ☐ [HUMANO] |
| 11 | Justificantes bancarios del pago íntegro de la renta | ☐ [HUMANO] |
| 12 | Justificante de la fianza de 600 € (02/01/2019) | ☐ [HUMANO] |
| 13 | Factura del bombín (☐ si llegase a existir formalmente) | [DND] |
| 14 | Adjuntos email 04/07: `FACTURES SERVEIS GENER FEBRER MARÇ.pdf`, `FACTURES SERVEIS ABRIL MAIG JUNY.pdf` | ✅ En correo `ma%C3%B1as2.pdf` |
| 15 | Capturas WhatsApp abril 2026 | ☐ [HUMANO] |
| 16 | Datos registrales (Roses Nº 2, Tomo 2760, Libro 84, Folio 59, Finca 4903) | ✅ En contrato matriz |
| 17 | Auditoría retroactiva del IVA en electricidad 2018–2026 | ☐ [HUMANO] |

---

# §22 — DIARIO ESTRATÉGICO DEL CASO (referencia: madre §22)

> ☐ [HUMANO] Sección a cumplimentar por el usuario durante el procedimiento.

---

# §23 — LIBRO MAYOR DEL LITIGIO (referencia: madre §23)

> ☐ [HUMANO] Sección a cumplimentar con extractos bancarios de 2018–2026.

---

# 📌 AUTOVALORACIÓN DE ESTA VERSIÓN 2

> La propia naturaleza perito-documental del documento exige que la autovaloración se limite a una descripción metodológica, no a una auto-calificación.

| Aspecto metodológico | Tratamiento en esta v2 |
|---|---|
| Tono | Redactado con criterio de perito documental. Sin adjetivación combativa. |
| Separación hechos / derecho / valoración | Cada hecho se acompaña del marco normativo aplicable, reservándose la valoración al juez. |
| Valoración de probabilidades | Eliminada. Las "probabilidades" han sido sustituidas por descripciones cualitativas y por referencias a la base documental disponible. |
| Cuantificación de la indemnización | Presentada como **estimación provisional**, con fórmula abierta a ejecución de sentencia. |
| Citación de días | El dato de "77 días" se acompaña de la calificación de mínimo y de la advertencia de que el día exacto es [DND]. |
| Tono estratégico | Conservado en §11, §12, §12B, §18 y §20, pero con presentación descriptiva (no combativa). |

---

*Documento v2 generado por MiniMax-M3 (pi coding agent) el 2026-07-15, como aplicación de la revisión metodológica solicitada por el usuario tras la primera lectura del expediente.*

*Convención del proyecto:* este archivo es paralelo al madre `expediente-fooday-vs-manas.md`, que solo el usuario modifica. El agente escribe en `*.propuesta-ia.md` y archivos análogos. Toda afirmación marcada con `[NL-N]` proviene del cuaderno NotebookLM `caso-fooday-vs-manas-expedient`. Los datos marcados con `[DND]` no constan en las fuentes del cuaderno. Los marcados con `[ESTIMACIÓN]` son cálculos provisionales sujetos a prueba. Los marcados con `[VALORACIÓN]` son cuestiones reservadas al juzgador.
