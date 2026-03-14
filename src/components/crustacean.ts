import idle1 from '../images/anim/idle_0001.webp';
import idle2 from '../images/anim/idle_0002.webp';
import walk1 from '../images/anim/walk_0001.webp';
import walk2 from '../images/anim/walk_0002.webp';
import walk3 from '../images/anim/walk_0003.webp';
import walk4 from '../images/anim/walk_0004.webp';
import walk5 from '../images/anim/walk_0005.webp';
import walk6 from '../images/anim/walk_0006.webp';
import walk7 from '../images/anim/walk_0007.webp';
import walk8 from '../images/anim/walk_0008.webp';

export type UiOptions = {
  autoPlay: boolean;
};

function setupUi(
  opts: UiOptions,
  onStart: (canvas: HTMLCanvasElement) => void,
) {
  const canvas = document.createElement('canvas');
  canvas.id = 'crustacean';
  canvas.style.background = 'transparent';
  canvas.style.width = '100%';
  canvas.style.position = 'fixed';
  canvas.style.bottom = '0';
  canvas.style.left = '0';

  const btn = document.createElement('button');
  let clicked = false;
  btn.type = 'button';
  btn.innerText = 'カニを召喚';
  btn.onclick = () => {
    if (clicked) {
      return;
    }
    clicked = true;
    btn.parentElement?.appendChild(canvas);
    btn.remove();
    onStart(canvas);
  };

  if (opts.autoPlay) {
    document.body.appendChild(canvas);
    onStart(canvas);
  } else {
    const footer = document.querySelector('footer');
    if (!footer) {
      throw new Error('"footer" not found');
    }
    footer.appendChild(btn);
  }
}

export function crustacean(opts: UiOptions) {
  function onStart(canvas: HTMLCanvasElement) {
    function rand(min: number, max: number): number {
      return Math.random() * (max - min + 1) + min;
    }

    function randDir(): -1 | 1 {
      return Math.random() < 0.5 ? -1 : 1;
    }

    const ctx_: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx_ == null) {
      throw new Error('Failed to get canvas context');
    }
    const ctx = ctx_;
    const SPEED = 4;

    function onCanvasResize() {
      canvas.width = window.innerWidth;
      canvas.height = 30;
    }
    window.addEventListener('resize', onCanvasResize);
    onCanvasResize();

    type Animation = {
      fps: number;
      frames: HTMLImageElement[];
    };
    type Crab = {
      x: number;
      y: number;
      bb_x: number;
      bb_y: number;
      bb_width: number;
      bb_height: number;
      mode: CrabMode;
    };
    type CrabMode = CrabWalk | CrabIdle;
    type CrabWalk = {
      type: 'walk';
      speed: number;
    };
    type CrabIdle = {
      type: 'idle';
      reason: CrabIdleReason;
      until: number;
    };
    type CrabIdleReason = 'user' | 'system';

    const animations: { walk: Animation; idle: Animation } = {
      walk: {
        fps: 6,
        frames: [walk1, walk2, walk3, walk4, walk5, walk6, walk7, walk8].map(
          (src) => {
            const img = new Image();
            img.src = src.src;
            img.width = 64;
            img.height = 64;
            return img;
          },
        ),
      },
      idle: {
        fps: 3,
        frames: [idle1, idle2].map((src) => {
          const img = new Image();
          img.src = src.src;
          img.width = 64;
          img.height = 64;
          return img;
        }),
      },
    };

    const crab: Crab = {
      x: canvas.width / 2 - 32,
      y: -16,
      bb_x: 0,
      bb_y: 16,
      bb_width: 64,
      bb_height: 30,
      mode: {
        type: 'walk',
        speed: SPEED,
      },
    };

    function crabWalk(): CrabWalk {
      return {
        type: 'walk',
        speed: randDir() * SPEED,
      };
    }

    function crabIdle(
      reason: CrabIdleReason,
      afterMsMin: number,
      afterMsMax: number,
    ): CrabIdle {
      return {
        type: 'idle',
        reason,
        until: performance.now() + rand(afterMsMin, afterMsMax),
      };
    }

    let currentFrame = 0;
    let lastFrameTime = 0;

    function animate(time: number) {
      const anim = animations[crab.mode.type];
      const frameDuration = 1000 / anim.fps;

      if (time - lastFrameTime > frameDuration) {
        if (crab.mode.type === 'walk') {
          crab.x += crab.mode.speed;
          if (crab.x < 0) {
            crab.mode.speed = SPEED;
          } else if (crab.x + crab.bb_x + crab.bb_width > canvas.width) {
            crab.mode.speed = -SPEED;
          }

          if (Math.random() < 0.01) {
            crab.mode = crabIdle('system', 1000, 3000);
          }
        } else {
          if (crab.mode.until < time) {
            crab.mode = crabWalk();
          }
        }
        lastFrameTime = time;
        currentFrame = (currentFrame + 1) % anim.frames.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          anim.frames[currentFrame],
          crab.x,
          crab.y,
          anim.frames[currentFrame].width,
          anim.frames[currentFrame].height,
        );
      }
      requestAnimationFrame(animate);
    }

    function hitTest(x: number, y: number, crab: Crab): boolean {
      return (
        x >= crab.x + crab.bb_x &&
        x <= crab.x + crab.bb_x + crab.bb_width &&
        y >= crab.y + crab.bb_y &&
        y <= crab.y + crab.bb_y + crab.bb_height
      );
    }

    canvas.addEventListener('mousemove', (e) => {
      if (hitTest(e.offsetX, e.offsetY, crab)) {
        if (crab.mode.type !== 'idle') {
          crab.mode = crabIdle('user', 5000, 10000);
        }
      } else {
        if (crab.mode.type === 'idle' && crab.mode.reason === 'user') {
          crab.mode = crabWalk();
        }
      }
    });

    canvas.addEventListener('mouseleave', () => {
      if (crab.mode.type === 'idle' && crab.mode.reason === 'user') {
        crab.mode = crabWalk();
      }
    });

    requestAnimationFrame(animate);
  }
  setupUi(opts, onStart);
}
