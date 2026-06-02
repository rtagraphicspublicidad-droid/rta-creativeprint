// Función que añade la clase 'visible' cuando el elemento entra en el visor
const observarElementos = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible

    // Seleccionamos los bloques que queremos animar
    const elementos = document.querySelectorAll('.contenedor-rojo, .contenedor-negro, .texto-inferior, #pricing, footer, .item-litografia, .item-pendon, .card-moderna, .info-laminado');
    
    elementos.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        observer.observe(el);
    });
};

// Ejecutar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    observarElementos();

    // Lógica para enviar mensajes en el chat
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const text = userInput.value.trim();
            if (text !== "") {
                // Crear burbuja de mensaje del usuario
                const msg = document.createElement('p');
                msg.textContent = text;
                msg.style.cssText = "background: #ff0015; color: white; padding: 8px 12px; border-radius: 10px; margin: 5px 0 5px auto; max-width: 80%; font-size: 0.9rem; text-align: right;";
                chatMessages.appendChild(msg);
                
                userInput.value = "";
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Respuesta automática simulada
                setTimeout(() => {
                    const reply = document.createElement('p');
                    reply.textContent = "¡Hola! Me llamo Esan asistente virtual de Rta Creative Print ¿En qué te puedo ayudar el día de  hoy?";
                    reply.style.cssText = "background: #eee; color: #333; padding: 8px 12px; border-radius: 10px; margin: 5px auto 5px 0; max-width: 80%; font-size: 0.9rem;";
                    chatMessages.appendChild(reply);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        });
    }
});

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('chat-hidden');
}

// Función para manejar las opciones seleccionables
function handleOption(option) {
    const chatMessages = document.getElementById('chat-messages');
    const optionsContainer = document.getElementById('chat-options');
    
    // Ocultar botones después de seleccionar una opción
    if (optionsContainer) optionsContainer.style.display = 'none';

    let userChoiceText = "";
    let botResponseText = "";
    let subOptions = null;

    if (option === 'servicios') {
        userChoiceText = "Nuestros servicios";
        botResponseText = "Contamos con una amplia gama de soluciones creativas. Selecciona una categoría para ver detalles y precios:";
        subOptions = [
            { text: "Litografía", val: "sub_lito" },
            { text: "Pendones y Vinilo", val: "sub_pendones" },
            { text: "Calcas para moto y Stickers", val: "sub_calcas" },
            { text: "Sublimación y Estampado", val: "sub_subli" }
        ];
    } else if (option === 'sub_lito') {
        userChoiceText = "Litografía";
        botResponseText = "<div class='chat-table'><div class='chat-table-header'>Tarjetas</div><div class='chat-table-row'><span>Una cara</span><span>$55.000</span></div><div class='chat-table-row'><span>Dos caras</span><span>$75.000</span></div><div class='chat-table-row'><span>Con brillo UV</span><span>$90.000</span></div><div class='chat-table-row'><span>Troqueladas</span><span>Según diseño</span></div><div class='chat-table-row'><span>Imantadas troqueladas</span><span>$260.000</span></div><div class='chat-table-row'><span>Imantadas sin troquelar</span><span>$195.000</span></div><div class='chat-table-header'>Volantes</div><div class='chat-table-row'><span>1 Cara (Media Carta 14x21.6cm)</span><span>$90.000</span></div><div class='chat-table-row'><span>2 Caras (Media Carta 14x21.6cm)</span><span>$140.000</span></div></div><small>Estos valores no incluyen diseño ni ajustes de diseño.</small>";
    } else if (option === 'sub_pendones') {
        userChoiceText = "Pendones y Vinilo";
        botResponseText = "<b>Pendones</b><div class='chat-table'><div class='chat-table-header'>Medio pliego (70x50cm)</div><div class='chat-table-row'><span>Con ojales:</span><span>$25.000</span></div><div class='chat-table-row'><span>Con tubos:</span><span>$35.000</span></div><div class='chat-table-header'>Pliego completo (70x100cm)</div><div class='chat-table-row'><span>Con ojales:</span><span>$35.000</span></div><div class='chat-table-row'><span>Con tubos:</span><span>$45.000</span></div></div><br><b>Vinilo</b><div class='chat-table'><div class='chat-table-header'>Medio pliego (70x50cm)</div><div class='chat-table-row'><span>Sin laminar:</span><span>$18.000</span></div><div class='chat-table-row'><span>Laminado:</span><span>$23.000</span></div><div class='chat-table-header'>Pliego completo (70x100cm)</div><div class='chat-table-row'><span>Sin laminar:</span><span>$30.000</span></div><div class='chat-table-row'><span>Laminado:</span><span>$40.000</span></div></div><br><b>Stickers</b><div class='chat-table'><div class='chat-table-header'>Pliego (70x100cm)</div><div class='chat-table-row'><span>Sin corte/sin laminar:</span><span>$30.000</span></div><div class='chat-table-row'><span>Sin corte laminado:</span><span>$40.000</span></div><div class='chat-table-row'><span>Con corte sin laminar:</span><span>$45.000</span></div><div class='chat-table-row'><span>Con corte laminado:</span><span>$55.000</span></div></div><br><small>Estos valores no incluyen diseño ni ajustes de diseño.</small>";
    } else if (option === 'sub_calcas') {
        userChoiceText = "Calcas para moto y Stickers";
        botResponseText = "<b>Calcas de Moto</b><br>Contamos con diseños especializados para marcas como:<br>" +
            "• Pulsar, TVS, AKT, Hero<br>• Honda, Suzuki, Beta<br>• CF Moto, KTM y más.<br><br>" +
            "<div onclick='handleOption(\"cotizar_calcas\")' style='background: #ff0015; color: white; padding: 12px; border-radius: 10px; text-align: center; font-weight: bold; cursor: pointer; transition: transform 0.2s;' onmouseover='this.style.transform=\"scale(1.02)\"' onmouseout='this.style.transform=\"scale(1)\"'>" +
            "“Cotiza tu referencia de moto”" +
            "</div><br>" +
            "<b>Stickers</b>" +
            "<div class='chat-table'><div class='chat-table-header'>Servicio</div><div class='chat-table-row'><span>Corte:</span><span>Troquelado</span></div><div class='chat-table-row'><span>Acabado:</span><span>Mate / Brillo</span></div></div>";
    } else if (option === 'sub_subli') {
        userChoiceText = "Sublimación y Estampado";
        botResponseText = "<b>Sublimación y Estampado (Calidad AAA)</b><br>Contamos con productos de alta durabilidad. Aquí tienes nuestros precios:<br><br>" +
            "<div style='overflow-x:auto; margin-top:5px;'>" +
            "<table style='width:100%; border-collapse: collapse; font-size: 0.8rem; text-align: left; background: white; border: 1px solid #ddd;'>" +
            "<tr style='background: #ff0015; color: white;'>" +
            "<th style='padding: 6px; border: 1px solid #ddd;'>Producto</th>" +
            "<th style='padding: 6px; border: 1px solid #ddd;'>Uni.</th>" +
            "<th style='padding: 6px; border: 1px solid #ddd;'>Doc.</th>" +
            "<th style='padding: 6px; border: 1px solid #ddd;'>Caja (36 ud)</th>" +
            "</tr>" +
            "<tr><td style='padding: 5px; border: 1px solid #ddd;'>Pocillo Blanco</td><td style='padding: 5px; border: 1px solid #ddd;'>$15k</td><td style='padding: 5px; border: 1px solid #ddd;'>$12k</td><td style='padding: 5px; border: 1px solid #ddd;'>$10k</td></tr>" +
            "<tr><td style='padding: 5px; border: 1px solid #ddd;'>Pocillo Mágico</td><td style='padding: 5px; border: 1px solid #ddd;'>$30k</td><td style='padding: 5px; border: 1px solid #ddd;'>$27k</td><td style='padding: 5px; border: 1px solid #ddd;'>$25k</td></tr>" +
            "<tr><td style='padding: 5px; border: 1px solid #ddd;'>Termos Metálicos</td><td style='padding: 5px; border: 1px solid #ddd;'>$25k</td><td style='padding: 5px; border: 1px solid #ddd;'>$22k</td><td style='padding: 5px; border: 1px solid #ddd;'>$20k</td></tr>" +
            "</table></div><br><small>*Precios unitarios por volumen. No incluyen diseño.</small>";
    } else if (option === 'cotizar') {
        userChoiceText = "Cotizar un proyecto";
        botResponseText = "Para brindarte una mejor cotización, necesitamos algunos datos sobre tu proyecto: <div class='chat-form'>" +
            "<label>Nombre completo</label><input type='text' id='form-nombre' placeholder='Tu nombre...'>" +
            "<label>Nombre del negocio</label><input type='text' id='form-negocio' placeholder='Empresa o emprendimiento...'>" +
            "<label>Número celular</label><input type='tel' id='form-celular' placeholder='Ej: 3001234567'>" +
            "<label>Tipo de proyecto</label><input type='text' id='form-proyecto' placeholder='Ej: Tarjetas, Pendón...'>" +
            "<label>Cuéntanos sobre tu proyecto</label><textarea id='form-detalles' placeholder='Medidas, cantidades, ideas...'></textarea>" +
            "<button onclick='enviarCotizacion()' style='background: #ff0015; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-top: 5px;'>Enviar información</button>" +
            "</div>";
    } else if (option === 'cotizar_calcas') {
        userChoiceText = "Cotizar calcas de moto";
        botResponseText = "¡Excelente elección! Por favor completa los datos para las calcas de tu moto: <div class='chat-form'>" +
            "<label>Nombre completo</label><input type='text' id='calca-nombre' placeholder='Tu nombre...'>" +
            "<label>Número celular</label><input type='tel' id='calca-celular' placeholder='Ej: 3001234567'>" +
            "<label>Marca o referencia de la moto</label><input type='text' id='calca-referencia' placeholder='Ej: Pulsar NS 200, KTM Duke...'>" +
            "<label>Tipo de diseño</label><select id='calca-tipo' style='width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ddd; font-family: inherit;'><option value='Personalizado'>Personalizado</option><option value='Genérico'>Genérico</option></select>" +
            "<label>Descripción o comentarios</label><textarea id='calca-detalles' placeholder='Colores, estilo, modificaciones...'></textarea>" +
            "<button onclick='enviarCotizacionCalcas()' style='background: #ff0015; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%;'>Enviar cotización</button>" +
            "</div>";
    } else if (option === 'faq') {
        userChoiceText = "Preguntas frecuentes";
        botResponseText = "Estas son algunas de nuestras preguntas frecuentes. Selecciona cualquiera de ellas para ver más información." +
            "<div class='faq-accordion'>" +
            "<div class='faq-item'><div class='faq-header' onclick='toggleFaq(this)'><span>¿Cuánto tiempo tarda un proyecto?</span><i>▼</i></div><div class='faq-content'>El tiempo de entrega depende del tipo de proyecto. Cuando el diseño es realizado por nuestro equipo, el tiempo estimado después de la aprobación del diseño es de 2 a 5 días hábiles, dependiendo del trabajo solicitado.<br><br>Si el cliente ya cuenta con el diseño y este queda aprobado, el tiempo de producción igualmente puede variar entre 2 y 5 días hábiles dependiendo del proyecto.</div></div>" +
            "<div class='faq-item'><div class='faq-header' onclick='toggleFaq(this)'><span>¿Qué información necesito enviarles?</span><i>▼</i></div><div class='faq-content'>Puedes enviarnos toda la información posible sobre tu proyecto. Entre más detalles recibamos, mejor podremos asesorarte y brindarte una cotización más precisa.<br><br>Los datos básicos que necesitamos son:<br>• Tipo de proyecto<br>• Medidas<br>• Cantidades<br>• Fecha en la que lo necesitas<br>• Si requiere instalación<br>• Lugar de entrega o instalación<br><br>También puedes enviarnos referencias, imágenes o diseños si ya cuentas con ellos.</div></div>" +
            "<div class='faq-item'><div class='faq-header' onclick='toggleFaq(this)'><span>¿Cuántas revisiones o cambios incluyen?</span><i>▼</i></div><div class='faq-content'>Incluimos entre 2 y 3 revisiones o ajustes dependiendo del tipo de proyecto.</div></div>" +
            "<div class='faq-item'><div class='faq-header' onclick='toggleFaq(this)'><span>¿Dónde trabajan?</span><i>▼</i></div><div class='faq-content'>Trabajamos principalmente de manera digital y a domicilio. Nuestras operaciones se manejan desde casa, por lo que todas las entregas y procesos de atención se realizan mediante canales virtuales como WhatsApp, Instagram, Facebook y TikTok.<br><br>Los productos y proyectos se coordinan y entregan a domicilio según el servicio solicitado.</div></div>" +
            "<div class='faq-item'><div class='faq-header' onclick='toggleFaq(this)'><span>¿Qué pasa si necesito cambios después del aprobado?</span><i>▼</i></div><div class='faq-content'>Si el proyecto ya fue aprobado y posteriormente impreso, producido o instalado, Rta Creative Print no se hace responsable por cambios adicionales.<br><br>Sin embargo, si el proyecto aún no ha entrado en proceso de producción o impresión, todavía es posible realizar modificaciones dentro del tiempo disponible antes de sacar el trabajo.<br><br>Generalmente existe un margen aproximado de un día antes de iniciar producción, dependiendo del proyecto.</div></div>" +
            "<div class='faq-item'><div class='faq-header' onclick='toggleFaq(this)'><span>¿Cuáles son sus métodos de pago?</span><i>▼</i></div><div class='faq-content'>Manejamos diferentes métodos de pago como Nequi, Daviplata y transferencia bancaria.<br><br>Nuestra modalidad de pago es 50/50:<br>• 50% al iniciar el proyecto<br>• 50% restante al momento de la entrega.</div></div>" +
            "</div>";
    }

    // Mostrar elección del usuario
    addMessage(userChoiceText, true);

    // Simular respuesta del bot
    setTimeout(() => {
        addMessage(botResponseText, false);
        
        if (subOptions) {
            renderSubOptions(subOptions);
        } else {
            setTimeout(() => {
                if (optionsContainer) {
                    chatMessages.appendChild(optionsContainer); // Mueve el menú al final de la charla
                    optionsContainer.style.display = 'flex';
                }
            }, 3000);
        }
    }, 800);
}

// Función para enviar los datos del formulario a WhatsApp
function enviarCotizacion() {
    const nombre = document.getElementById('form-nombre').value;
    const negocio = document.getElementById('form-negocio').value;
    const celular = document.getElementById('form-celular').value;
    const proyecto = document.getElementById('form-proyecto').value;
    const detalles = document.getElementById('form-detalles').value;

    if(!nombre || !celular || !detalles) {
        alert("Por favor completa los campos principales para poder ayudarte.");
        return;
    }

    const mensajeWhatsApp = `Nombre completo:\n${nombre}\n\nNombre del negocio:\n${negocio}\n\nNúmero celular:\n${celular}\n\nTipo de proyecto:\n${proyecto}\n\nDetalles del proyecto:\n${detalles}`;
    
    const numeroWhatsApp = "573025470037";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    window.open(url, '_blank');

    // Mensaje de confirmación en el chat como respuesta del bot
    setTimeout(() => {
        addMessage("¡Gracias por comunicarte con Rta Creative Print!<br>Un asesor revisará tu información y se contactará contigo muy pronto.", false);
        
        // Mostrar el menú principal nuevamente para que el usuario no se pierda
        const optionsContainer = document.getElementById('chat-options');
        const chatMessages = document.getElementById('chat-messages');
        setTimeout(() => {
            chatMessages.appendChild(optionsContainer);
            optionsContainer.style.display = 'flex';
        }, 2000);
    }, 800);
}

function renderSubOptions(options) {
    const chatMessages = document.getElementById('chat-messages');
    const subContainer = document.createElement('div');
    subContainer.className = 'chat-options';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.text;
        btn.onclick = () => {
            subContainer.remove();
            handleOption(opt.val);
        };
        subContainer.appendChild(btn);
    });
    chatMessages.appendChild(subContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función auxiliar para añadir mensajes dinámicamente
function addMessage(text, isUser) {
    const chatMessages = document.getElementById('chat-messages');
    const msg = document.createElement('p');
    if (isUser) {
        msg.textContent = text;
        msg.style.cssText = "background: #ff0015; color: white; padding: 8px 12px; border-radius: 10px; margin: 5px 0 5px auto; max-width: 80%; font-size: 0.9rem; text-align: right;";
    } else {
        msg.innerHTML = text; // Usamos innerHTML para permitir saltos de línea <br>
        msg.style.cssText = "background: #eee; color: #333; padding: 8px 12px; border-radius: 10px; margin: 5px auto 5px 0; max-width: 80%; font-size: 0.9rem;";
    }
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para alternar el acordeón de FAQ (Esto es lo que hace que la respuesta "salga")
function toggleFaq(header) {
    const item = header.parentElement;
    item.classList.toggle('active');
    
    // Ajustar el scroll automáticamente para ver el contenido desplegado
    const chatMessages = document.getElementById('chat-messages');
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 200);
}

// Función para iniciar la cotización desde un botón externo a la ventana del chat
function iniciarCotizacionChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
        chatWindow.classList.remove('chat-hidden');
    }
    handleOption('cotizar');
}

// Funciones para el Modal de Calcas (Página calcas.html)
function abrirModalCalcas() {
    const modal = document.getElementById('modal-calcas');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquea el scroll de fondo
    }
}

function cerrarModalCalcas() {
    const modal = document.getElementById('modal-calcas');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaura el scroll
    }
}

// Cerrar modal al hacer clic fuera del contenido blanco
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal-calcas');
    if (event.target === modal) {
        cerrarModalCalcas();
    }
});

function enviarCotizacionCalcasModal() {
    const nombre = document.getElementById('modal-nombre').value.trim();
    const celular = document.getElementById('modal-celular').value.trim();
    const referencia = document.getElementById('modal-referencia').value.trim();
    const tipo = document.getElementById('modal-tipo').value;
    const detalles = document.getElementById('modal-detalles').value.trim();

    if(!nombre || !celular || !referencia || !detalles) {
        alert("Por favor completa todos los campos para poder enviarte la cotización.");
        return;
    }

    const mensajeWhatsApp = `🏍️ Solicitud de cotización de calcas para moto\n\n👤 Nombre: ${nombre}\n\n📱 Teléfono: ${celular}\n\n🏍️ Marca o referencia: ${referencia}\n\n🎨 Tipo de diseño: ${tipo}\n\n📝 Solicitud: ${detalles}\n\nHola, me gustaría recibir una cotización para las calcas de mi moto.`;
    
    const numeroWhatsApp = "573025470037";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    window.open(url, '_blank');
    cerrarModalCalcas();
}

function enviarCotizacionCalcas() {
    const nombre = document.getElementById('calca-nombre').value.trim();
    const celular = document.getElementById('calca-celular').value.trim();
    const referencia = document.getElementById('calca-referencia').value.trim();
    const tipo = document.getElementById('calca-tipo').value;
    const detalles = document.getElementById('calca-detalles').value.trim();

    if(!nombre || !celular || !referencia || !detalles) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const mensajeWhatsApp = `🏍️ Solicitud de cotización de calcas para moto\n\n👤 Nombre: ${nombre}\n📱 Celular: ${celular}\n🏍️ Marca o referencia: ${referencia}\n🎨 Tipo de diseño: ${tipo}\n📝 Descripción: ${detalles}\n\nHola, me gustaría cotizar unas calcas para mi moto.`;
    
    const numeroWhatsApp = "573025470037";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    window.open(url, '_blank');

    setTimeout(() => {
        addMessage("¡Solicitud enviada! Un asesor revisará los detalles de tus calcas y te contactará en breve por WhatsApp.", false);
        
        const optionsContainer = document.getElementById('chat-options');
        const chatMessages = document.getElementById('chat-messages');
        setTimeout(() => {
            chatMessages.appendChild(optionsContainer);
            optionsContainer.style.display = 'flex';
        }, 2000);
    }, 800);
}