---
layout: base.njk
title: home
templateEngineOverride: njk, md
---


<br>
<div class="profile-pic-container">
  <img src="assets/images/tachikoma.jpg" alt="Sanket's Profile Picture" class="profile-pic">
</div>

<h1 class="pixel-art-secondary-header">hi, i am sanket</h1>


<div class="manrope-500 body-text-font dim-text">
i’m a master's student, curious about all things ai and how intelligent systems shape the world around us. i love learning by building and experimenting, and when i’m not diving into tech, i enjoy game development as a fun creative outlet, playing around with ideas and interactive experiences.
</div>


<h2 class="pixel-art-secondary-header">experience</h2>
<section class="timeline">

  {% for item in experience %}
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <div class="timeline-header-container">
        {% if item.logo %}<img src="{{ item.logo }}" alt="{{ item.company }}" class="timeline-logo" style="height: {{ (item.scale or 1) * 40 }}px;">{% endif %}
        <div>
          <span class="manrope-500 timeline-date">{{ item.date }}</span>
          <h3 class="manrope-500 body-text-font" style="margin: 0;">{{ item.role }} — {{ item.company }}</h3>
        </div>
      </div>
      <p class="manrope-500 body-text-font dim-text">
        {{ item.description }}
      </p>
    </div>
  </div>
  {% endfor %}
</section>

<h2 class="pixel-art-secondary-header">education</h2>
<section class="timeline">
  {% for item in education %}
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <div class="timeline-header-container">
        {% if item.logo %}<img src="{{ item.logo }}" alt="{{ item.institution }}" class="timeline-logo" style="height: {{ (item.scale or 1) * 40 }}px;">{% endif %}
        <div>
          <span class="manrope-500 timeline-date">{{ item.date }}</span>
          <h3 class="manrope-500 body-text-font" style="margin: 0;">{{ item.degree }} — {{ item.institution }}</h3>
        </div>
      </div>
      <p class="manrope-500 body-text-font dim-text">
        {{ item.description }}
      </p>
    </div>
  </div>
  {% endfor %}
</section>

<h2 class="pixel-art-secondary-header">tech stack</h2>

<p class="manrope-500 body-text-font dim-text">
technologies and tools i work with to build innovative solutions.
</p>

<div class="marquee">
  <div class="marquee-content">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" alt="python" title="python" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" alt="tensorflow" title="tensorflow" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-plain-wordmark.svg" alt="pytorch" title="pytorch" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" alt="scikit-learn" title="scikit-learn" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original-wordmark.svg" alt="numpy" title="numpy" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original-wordmark.svg" alt="pandas" title="pandas" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="javascript" title="javascript" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg" alt="git" title="git" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg" alt="docker" title="docker" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" alt="react" title="react" />
          
    <!-- Duplicates for infinite scroll effect -->
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" alt="python" title="python" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" alt="tensorflow" title="tensorflow" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-plain-wordmark.svg" alt="pytorch" title="pytorch" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" alt="scikit-learn" title="scikit-learn" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original-wordmark.svg" alt="numpy" title="numpy" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original-wordmark.svg" alt="pandas" title="pandas" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="javascript" title="javascript" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg" alt="git" title="git" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg" alt="docker" title="docker" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" alt="react" title="react" />
  </div>
</div>

<div class="tech-stack-expandable">
  <button id="expand-tech-stack-btn" class="expand-btn">show all &gt;</button>
  <div id="tech-stack-details" class="tech-stack-details-container">
    
    <div class="tech-category">
      <h3 class="manrope-500 body-text-font">programming languages</h3>
      <div class="tech-items">
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="python" /><span>python</span></div>
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="javascript" /><span>javascript</span></div>
      </div>
    </div>

    <div class="tech-category">
      <h3 class="manrope-500 body-text-font">ai &amp; ml frameworks</h3>
      <div class="tech-items">
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" alt="tensorflow" /><span>tensorflow</span></div>
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" alt="pytorch" /><span>pytorch</span></div>
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" alt="scikit-learn" /><span>scikit-learn</span></div>
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" alt="numpy" /><span>numpy</span></div>
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" alt="pandas" /><span>pandas</span></div>
      </div>
    </div>

    <div class="tech-category">
      <h3 class="manrope-500 body-text-font">web development</h3>
      <div class="tech-items">
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="html5" /><span>html5</span></div>
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="css3" /><span>css3</span></div>
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="react" /><span>react</span></div>
      </div>
    </div>

    <div class="tech-category">
      <h3 class="manrope-500 body-text-font">backend &amp; devops</h3>
      <div class="tech-items">
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="git" /><span>git</span></div>
        <div class="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="docker" /><span>docker</span></div>
      </div>
    </div>

  </div>
</div>


<div class="home-projects-section">
  <h2 class="pixel-art-secondary-header">projects</h2>
  <section class="projects-grid body-text-font">
    <article class="project-card">
      <a href="/projects/" class="project-card-link">
        <div class="project-card-content">
          <h2 class="project-title">view all projects</h2>
          <p class="project-excerpt">
            explore my full portfolio of work
          </p>
        </div>
      </a>
    </article>
  </section>
</div>

<div class="home-blogs-section">
  <h2 class="pixel-art-secondary-header">blogs</h2>
  <section class="blog-grid body-text-font">
    {%- for post in collections.blogs.slice(0, 4) -%}
    <article class="blog-card">
      <a href="{{ post.url }}" class="blog-card-link">
        <div class="blog-card-content">
          <h2 class="blog-title">{{ post.data.title }}</h2>
          <p class="manrope-500 blog-excerpt">
            {{ post.data.description or post.data.summary }}
          </p>
        </div>
      </a>
    </article>
    {%- endfor -%}
  </section>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const expandBtn = document.getElementById('expand-tech-stack-btn');
    const techDetails = document.getElementById('tech-stack-details');

    if (expandBtn && techDetails) {
      expandBtn.addEventListener('click', () => {
        const isExpanded = techDetails.classList.toggle('expanded');
        expandBtn.textContent = isExpanded ? 'show less <' : 'show all >';
      });
    }
  });
</script>
